const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

console.log(" contactRoutes.js loaded");

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER, 
      subject: ` New message from ${name}`,
      text: message,
    });

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error(" Failed to send message:", error);
    res.status(500).json({ error: "Failed to send message. Try again." });
  }
});


module.exports = router;
