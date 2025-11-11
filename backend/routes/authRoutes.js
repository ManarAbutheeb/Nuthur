
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user");
const nodemailer = require('nodemailer'); 
const VerificationCode = require('../models/VerificationCode');
const router = express.Router();
const cors = require("cors");


// تسجيل مستخدم جديد وإرسال زر التفعيل
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ error: "Email already exists" });
    } else if (existingUser && !existingUser.isVerified) {
      await User.deleteOne({ email });
    }

    const hashed = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = new User({ 
      name, email, password: hashed, role, isVerified: false, verificationToken 
    });
    await user.save();

    // إعداد nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // رابط التفعيل المباشر
    const verificationUrl = `http://localhost:5000/api/auth/verify-email?email=${email}&token=${verificationToken}`;

    // إرسال الإيميل مع زر التفعيل
    await transporter.sendMail({
      from: `"Nuthur Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Activate your account - Nuthur",
      html: `
        <div style="text-align:center; font-family: Arial, sans-serif;">
          <h2>مرحباً ${name} 👋</h2>
          <p>اضغطي الزر أدناه لتفعيل حسابك:</p>
          <a href="${verificationUrl}">
            <button style="
              background-color:#d32f2f;
              color:white;
              padding:10px 20px;
              border:none;
              border-radius:6px;
              cursor:pointer;
            ">
              Activate Account
            </button>
          </a>
        </div>
      `,
    });

    res.json({ message: "User registered successfully. Check your email to activate your account." });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// endpoint التفعيل المباشر بالزر
router.get('/verify-email', async (req, res) => {
  const { email, token } = req.query;

  try {
    const user = await User.findOne({ email, verificationToken: token });
    if (!user) return res.status(400).send("Invalid link or token ");

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    // إعادة التوجيه تلقائيًا لصفحة تسجيل الدخول على الفرونت
    res.redirect("http://localhost:3000/log-in");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error while approving email.");
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

    if (!user.isVerified) return res.status(400).json({ error: "Please verify your email first." });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, role: user.role, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
// Forgot password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.json({ message: "If an account with that email exists, a reset code will be sent." });

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  await VerificationCode.deleteMany({ email });
  await VerificationCode.create({ email, code: resetCode, expiresAt: Date.now() + 10 * 60 * 1000 });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  await transporter.sendMail({
    from: `"Nuthur Support" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset Code - Nuthur",
    html: `<p>Your password reset code is: <b>${resetCode}</b></p>`
  });

  res.json({ message: "Password reset code sent to your email." });
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

