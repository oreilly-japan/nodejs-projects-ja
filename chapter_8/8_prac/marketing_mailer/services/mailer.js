import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: "<EMAIL_ADDRESS>",
    pass: "<APP_PASSWORD>",
  },
});

export const sendMail = async (to, html) => {
  const mailOptions = {
    from: "<EMAIL_ADDRESS>",
    to,
    subject: "Email from Inn Box!",
    html,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.response}`);
  } catch (e) {
    console.log(`An error occurred: ${e.message}`);
  }
};
