import { scheduleJob } from "node-schedule";
import { sendMail } from "./mailer.js";
import { campaignMail } from "../mailTemplates.js";
import Lead from "../db.js";

export const schedule = (timeOptions) => {
  scheduleJob(timeOptions, async () => {
    const leads = await Lead.findAll({
      where: { verified: true, unsubscribed: false },
    });
    for (const lead of leads) {
      await sendMail(
        lead.email,
        campaignMail("Special Promotion", "promo1", lead.email)
      );
    }
  });
};
