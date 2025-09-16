const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const VerificationCode = require('../models/VerificationCode');

const nodemailer = require('nodemailer'); 

const router = express.Router();
// تسجيل مستخدم جديد
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, role });
    await user.save();
    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// تسجيل الدخول
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email exists
    const user = await User.findOne({ email });
    if (!user) {
      // Return success for security reasons (don't reveal if email exists)
      return res.json({ message: 'If an account with that email exists, a reset code will be sent.' });
    }

    // Generate code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code

    // Delete any old codes and save the new one
    await VerificationCode.deleteMany({ email });
    await VerificationCode.create({ email, code: resetCode });

    // Configure Nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Setup email content
    let mailOptions = {
      from: `"Nuthur Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Code - Nuthur',
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2>Password Recovery</h2>
          <p>You requested to reset your password.</p>
          <p style="font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #dc3545;">${resetCode}</p>
          <p>This code is valid for <strong>10 minutes</strong> only.</p>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Response to frontend
    res.json({ message: 'Password reset code has been sent to your email.' });

  } catch (err) {
    console.error('Error in forgot-password:', err);
    res.status(500).json({ error: 'An error occurred while sending the reset code.' });
  }
});

// 2. Endpoint to verify code
router.post('/verify-code', async (req, res) => {
  try {
    const { email, code } = req.body;

    // Find the code in database
    const validCode = await VerificationCode.findOne({ email, code });

    if (!validCode) {
      return res.status(400).json({ error: 'Invalid or expired verification code.' });
    }

    // If code is found, it's valid
    res.json({ message: 'Verification code is correct.' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Endpoint to set new password (after code verification)
router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Find user and update password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // (Optional) Delete the used code to prevent reuse
    await VerificationCode.deleteMany({ email });

    res.json({ message: 'Password has been reset successfully.' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
