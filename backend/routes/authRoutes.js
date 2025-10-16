const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const VerificationCode = require('../models/VerificationCode');

const nodemailer = require('nodemailer'); 

const router = express.Router();
// تسجيل مستخدم جديد
// تسجيل مستخدم جديد مع إرسال كود التحقق
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // هل الإيميل موجود أصلاً؟
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // تشفير كلمة المرور
    const hashed = await bcrypt.hash(password, 10);

    // إنشاء المستخدم
    const user = new User({ name, email, password: hashed, role, isVerified: false });
    await user.save();

    // حذف أي رموز تحقق سابقة
    await VerificationCode.deleteMany({ email });

    // توليد كود تحقق من 6 أرقام
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // حفظ الكود في قاعدة البيانات
    await VerificationCode.create({
      email,
      code,
      expiresAt: Date.now() + 10 * 60 * 1000, // ينتهي بعد 10 دقائق
    });

    // إعداد إرسال الإيميل
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // إرسال الإيميل
    await transporter.sendMail({
      from: `"Nuthur Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your email - Nuthur",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2>Welcome ${name}!</h2>
          <p>Your verification code is:</p>
          <h1 style="color:#dc3545;">${code}</h1>
          <p>This code will expire in 10 minutes.</p>
        </div>
      `,
    });

    res.json({ message: "User registered successfully. Verification code sent to your email." });
  } catch (err) {
    console.error(err);
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
    res.json({ token, role: user.role ,  name: user.name,      
      email: user.email });
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
// التحقق من البريد الإلكتروني
router.post('/verify-email', async (req, res) => {
  const { email, code } = req.body;

  try {
    const record = await VerificationCode.findOne({ email, code });

    if (!record) {
      return res.status(400).json({ error: "Invalid or expired verification code." });
    }

    // تحديث حالة المستخدم إلى verified
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    user.isVerified = true;
    await user.save();

    // حذف الكود من قاعدة البيانات بعد التحقق
    await VerificationCode.deleteMany({ email });

    res.json({ message: "✅ Email verified successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while verifying email." });
  }
});
