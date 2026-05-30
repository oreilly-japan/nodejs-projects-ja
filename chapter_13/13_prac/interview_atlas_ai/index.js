import Fastify from "fastify";
import axios from "axios";
import dotenv from "dotenv";
import path from "path";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();

const BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const MODEL = "gemini-3.1-flash-lite-preview:generateContent";
const API_URL = `${BASE}/${MODEL}?key=${process.env.GEMINI_API_KEY}`;
const JWT_SECRET = process.env.JWT_SECRET || "dummyJWTsecret";

const fastify = Fastify({ logger: true });
const PORT = process.env.PORT || 3000;

const dbPromise = open({
  filename: path.resolve("./users.db"),
  driver: sqlite3.Database,
});

const initializeDb = async () => {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId TEXT UNIQUE,
      password TEXT NOT NULL,
      learning_profile TEXT DEFAULT 'This user has no recorded learning profile yet.'
    )
  `);
  console.log("Users table initialized");
};

initializeDb();

const verifyJWT = async (request, reply) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return reply.status(401).send({ error: "Missing authentication token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    request.user = decoded;
  } catch (error) {
    return reply.status(401).send({ error: "Invalid or expired token" });
  }
};

// Exercise 2: Detect query type from keywords and build a prompt modifier
const detectQueryType = (prompt) => {
  const lowerPrompt = prompt.toLowerCase();

  if (lowerPrompt.includes("practice")) {
    return {
      type: "practice",
      instruction:
        "Provide a practice question or exercise for the user to solve on this topic. Include hints if appropriate.",
    };
  }
  if (lowerPrompt.includes("code")) {
    return {
      type: "code",
      instruction:
        "Provide a clear code example that demonstrates this concept. Include comments explaining key parts.",
    };
  }
  if (lowerPrompt.includes("explain")) {
    return {
      type: "explain",
      instruction:
        "Provide a detailed, beginner-friendly explanation of this concept. Use analogies or step-by-step breakdowns where helpful.",
    };
  }

  return {
    type: "general",
    instruction: "Answer the user's question clearly and concisely.",
  };
};

// Exercise 1 & 2: Updated to include learning analytics and query-type adaptation
const generateResponseWithSummary = async (
  prompt,
  learningProfile,
  queryType
) => {
  try {
    const requestData = {
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are an AI assistant helping users learn programming.
              The user has the following learning profile: "${learningProfile}".

              Query type instruction: ${queryType.instruction}

              Based on the user's profile and query, do the following:
              1. Answer their query according to the query type instruction.
              2. Analyze the topic and categorize the user's ability
                 (e.g., "Strong in Algorithms", "Weak in Recursion").
              3. Update their profile summary including strengths and weaknesses.
              4. Suggest areas for improvement based on their profile.

              Respond in **valid JSON format**:
              {
                "response": "Your AI-generated response",
                "updatedProfileSummary": "Updated one-sentence profile summary.",
                "strengths": ["topic1", "topic2"],
                "weaknesses": ["topic3", "topic4"],
                "suggestedImprovements": "Brief suggestion for what to study next."
              }`,
            },
            { text: `User query: ${prompt}` },
          ],
        },
      ],
    };

    const response = await axios.post(API_URL, requestData, {
      headers: { "Content-Type": "application/json" },
    });

    const rawText =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const cleanedJson = rawText.replace(/```json|```/g, "").trim();

    try {
      const parsedResponse = JSON.parse(cleanedJson);
      return {
        answer: parsedResponse.response || "No valid response received.",
        updatedProfileSummary:
          parsedResponse.updatedProfileSummary || learningProfile,
        strengths: parsedResponse.strengths || [],
        weaknesses: parsedResponse.weaknesses || [],
        suggestedImprovements:
          parsedResponse.suggestedImprovements ||
          "Keep practicing to build your profile.",
      };
    } catch {
      console.error("Invalid JSON format from API:", cleanedJson);
      return { error: "Invalid JSON response", details: cleanedJson };
    }
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    return {
      error: "Failed to generate response",
      details: error.response?.data || error.message,
    };
  }
};

fastify.post("/register", async (request, reply) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return reply.status(400).send({ error: "Email and password required" });
  }

  try {
    const db = await dbPromise;
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.run(
      "INSERT INTO users (userId, password, learning_profile) VALUES (?, ?, ?)",
      [
        email,
        hashedPassword,
        JSON.stringify({
          previousQueries: [],
          strengths: [],
          weaknesses: [],
        }),
      ]
    );

    const token = jwt.sign({ userId: email }, JWT_SECRET, { expiresIn: "7d" });
    reply.send({ token });
  } catch (error) {
    console.error("Registration error:", error);
    reply.status(500).send({ error: "Failed to register user" });
  }
});

fastify.post("/login", async (request, reply) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return reply.status(400).send({ error: "Email and password required" });
  }

  try {
    const db = await dbPromise;
    const user = await db.get("SELECT * FROM users WHERE userId = ?", [email]);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return reply.status(401).send({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: email }, JWT_SECRET, { expiresIn: "7d" });
    reply.send({ token });
  } catch (error) {
    console.error("Login error:", error);
    reply.status(500).send({ error: "Failed to authenticate user" });
  }
});

fastify.post("/query", { preHandler: verifyJWT }, async (request, reply) => {
  try {
    const { prompt } = request.body;
    const userId = request.user.userId;
    const db = await dbPromise;

    const row = await db.get(
      "SELECT learning_profile FROM users WHERE userId = ?",
      [userId]
    );
    const learningProfile =
      row?.learning_profile ||
      JSON.stringify({ previousQueries: [], strengths: [], weaknesses: [] });

    // Exercise 2: Detect query type from prompt keywords
    const queryType = detectQueryType(prompt);

    // Exercise 1 & 2: Pass queryType to the AI function
    const {
      answer,
      updatedProfileSummary,
      strengths,
      weaknesses,
      suggestedImprovements,
    } = await generateResponseWithSummary(prompt, learningProfile, queryType);

    // Exercise 1: Build updated profile JSON with analytics
    let profileData;
    try {
      profileData = JSON.parse(learningProfile);
    } catch {
      profileData = { previousQueries: [], strengths: [], weaknesses: [] };
    }

    profileData.previousQueries.push({
      query: prompt,
      queryType: queryType.type,
      timestamp: new Date().toISOString(),
    });

    // Merge new strengths/weaknesses with existing ones (deduplicate)
    profileData.strengths = [
      ...new Set([...profileData.strengths, ...strengths]),
    ];
    profileData.weaknesses = [
      ...new Set([...profileData.weaknesses, ...weaknesses]),
    ];
    profileData.summary = updatedProfileSummary;

    await db.run("UPDATE users SET learning_profile = ? WHERE userId = ?", [
      JSON.stringify(profileData),
      userId,
    ]);

    reply.send({
      answer,
      queryType: queryType.type,
      updatedProfileSummary,
      strengths: profileData.strengths,
      weaknesses: profileData.weaknesses,
      suggestedImprovements,
    });
  } catch (error) {
    console.error("Query error:", error);
    reply.status(500).send("Error processing query");
  }
});

const start = async () => {
  try {
    const address = await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server running at ${address}`);
  } catch (err) {
    console.error("Server failed to start:", err);
    process.exit(1);
  }
};

start();
