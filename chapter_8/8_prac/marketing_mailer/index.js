import Fastify from "fastify";
import formBody from "@fastify/formbody";
import { sendMail } from "./services/mailer.js";
import { schedule } from "./services/scheduler.js";
schedule({ second: 30 });
import {
  welcomeMail,
  confirmationMail,
  campaignMail,
} from "./mailTemplates.js";

import Lead from "./db.js";

const app = Fastify();
await app.register(formBody);

app.post("/subscribe", async (request, reply) => {
  const { email } = request.body;
  console.log(`Received ${email}`);
  try {
    const existingLead = await Lead.findOne({ where: { email } });
    if (existingLead && existingLead.unsubscribed) {
      console.log(`${email} is unsubscribed. Skipping.`);
      reply.send({ message: "This email has been unsubscribed." });
      return;
    }
    await Lead.create({ email });
    await sendMail(email, welcomeMail(email));
  } catch (e) {
    console.log("Could not save the Lead", e.message);
  }
  reply.send({ message: "ok" });
});

app.get("/verify/:email", async (request, reply) => {
  const { email } = request.params;
  try {
    const lead = await Lead.findOne({ where: { email } });
    if (lead) {
      lead.verified = true;
      await lead.save();
      console.log(`${email} is verified`);
      await sendMail(email, confirmationMail(undefined, email));
    }
  } catch (e) {
    console.log("Could not verify the Lead", e.message);
    reply.send({ message: "Unable to verify." });
  }
});

app.get(
  "/campaign/:campaignKey/user/:email/image.png",
  async (request, reply) => {
    const { email, campaignKey } = request.params;
    try {
      const lead = await Lead.findOne({ where: { email } });
      if (lead) {
        lead.lastCampaign = campaignKey;
        await lead.save();
        console.log(`${email} opened ${campaignKey}`);
      }
    } catch (e) {
      console.log("An error occurred", e.message);
    }
    reply.send({ message: "ok" });
  }
);

app.get("/unsubscribe/:email", async (request, reply) => {
  const { email } = request.params;
  try {
    const lead = await Lead.findOne({ where: { email } });
    if (lead) {
      lead.unsubscribed = true;
      await lead.save();
      console.log(`${email} has unsubscribed`);
      reply.send({ message: `${email} has unsubscribed` });
    } else {
      reply.send({ message: "Email address not found." });
    }
  } catch (e) {
    console.log("An error occurred", e.message);
    reply.send({ message: "An error occurred." });
  }
});

app.get("/click/:campaignKey/user/:email", async (request, reply) => {
  const { email, campaignKey } = request.params;
  try {
    const lead = await Lead.findOne({ where: { email } });
    if (lead) {
      lead.lastClickedCampaign = campaignKey;
      await lead.save();
      console.log(`${email} clicked on ${campaignKey}`);
    }
  } catch (e) {
    console.log("An error occurred", e.message);
  }
  reply.send({ message: "ok" });
});

const port = process.env.PORT || 3000;

try {
  sendMail(
    "<EMAIL_ADDRESS>",
    campaignMail("Special Promotion", "promo1", "<EMAIL_ADDRESS>")
  );
  await app.listen({ port, host: "0.0.0.0" });
  console.log(`Server running at http://localhost:${port}`);
} catch (err) {
  console.error("Error starting server:", err);
  process.exit(1);
}
