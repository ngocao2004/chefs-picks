const nodemailer = require("nodemailer");

const MAIL_PORT = Number(process.env.MAIL_PORT) || 587;

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: MAIL_PORT,
  secure: MAIL_PORT === 465,
  auth:
    process.env.MAIL_USER && process.env.MAIL_PASS
      ? {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        }
      : undefined,
});

const sendMail = async ({ to, subject, html, text }) => {
  const from = process.env.MAIL_FROM || process.env.MAIL_USER;

  if (!process.env.MAIL_HOST) {
    throw new Error("MAIL_HOST is not configured");
  }

  return transporter.sendMail({
    from,
    to,
    subject,
    html,
    text,
  });
};

module.exports = { sendMail };
