import bcrypt from "bcrypt";
import promptModule from "prompt-sync";
import { MongoClient } from "mongodb";

const prompt = promptModule();

const dbUrl = process.env.MONGO_URL || "mongodb://localhost:27017";
const client = new MongoClient(dbUrl);
const dbName = "passwordManager";

let hasPasswords = false;
let passwordsCollection, authCollection;

const main = async () => {
  try {
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    authCollection = db.collection("auth");
    passwordsCollection = db.collection("passwords");
    const hashedPassword = await authCollection.findOne({ type: "auth" });
    hasPasswords = !!hashedPassword;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

const saveNewPassword = async (password) => {
  const saltRoundsInput = prompt("Enter salt rounds (default: 10): ");
  const saltRounds = parseInt(saltRoundsInput, 10) || 10;
  const hash = bcrypt.hashSync(password, saltRounds);
  await authCollection.insertOne({ type: "auth", hash, saltRounds });
  console.log(`Password has been saved! (salt rounds: ${saltRounds})`);
  await showMenu();
};

const compareHashedPassword = async (password) => {
  const authDoc = await authCollection.findOne({ type: "auth" });
  if (!authDoc || !authDoc.hash) {
    throw new Error("No stored hash found.");
  }
  console.log(`Using salt rounds: ${authDoc.saltRounds}`);
  return await bcrypt.compare(password, authDoc.hash);
};

const promptNewPassword = async () => {
  const response = prompt("Enter a main password: ");
  return saveNewPassword(response);
};

const promptOldPassword = async () => {
  let verified = false;
  while (!verified) {
    const response = prompt("Enter your password: ");
    const result = await compareHashedPassword(response);
    if (result) {
      console.log("Password verified.");
      verified = true;
      await showMenu();
    } else {
      console.log("Password incorrect. Try again.");
    }
  }
};

const viewPasswords = async () => {
  const passwords = await passwordsCollection.find({}).toArray();
  passwords.forEach(({ source, password }, index) => {
    console.log(`${index + 1}. ${source} => ${password}`);
  });
  await showMenu();
};

const findPasswordBySource = async () => {
  const source = prompt("Enter source name to search: ");
  const result = await passwordsCollection.findOne({ source });
  if (result) {
    console.log(`${result.source} => ${result.password}`);
  } else {
    console.log("No password saved for that source.");
  }
  await showMenu();
};

const showMenu = async () => {
  console.log(`
1. View passwords
2. Manage new password
3. Verify password
4. Exit
5. Find password by source`);
  const response = prompt(">");
  switch (response) {
    case "1":
      await viewPasswords();
      break;
    case "2":
      await promptManageNewPassword();
      break;
    case "3":
      await promptOldPassword();
      break;
    case "4":
      process.exit();
    case "5":
      await findPasswordBySource();
      break;
    default:
      console.log("That's an invalid response.");
      await showMenu();
  }
};

const promptManageNewPassword = async () => {
  const source = prompt("Enter name for password: ");
  const password = prompt("Enter password to save: ");
  await passwordsCollection.findOneAndUpdate(
    { source },
    { $set: { password } },
    {
      returnDocument: "after",
      upsert: true,
    }
  );
  console.log(`Password for ${source} has been saved!`);
  await showMenu();
};

await main();
if (!hasPasswords) promptNewPassword();
else promptOldPassword();
