const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

async function sendEmail(toEmail, subject, htmlContent) {
  await transporter.sendMail({ from: `"Nuthur App" <${process.env.EMAIL_USER}>`, to: toEmail, subject, html: htmlContent });
}

module.exports = { sendEmail };
