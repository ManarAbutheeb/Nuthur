const User = require("../models/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

  
    const verificationToken = crypto.randomBytes(32).toString("hex");

  
    const user = new User({ name, email, password, role, verificationToken });
    await user.save();


    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

 const BASE_URL = process.env.BACKEND_URL || "http://localhost:3000";
 
    const verificationUrl = `${BASE_URL}/approve-email?email=${email}&token=${verificationToken}`;

    // إرسال الإيميل
    await transporter.sendMail({
      from: `"Nuthur App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Activate your account",
      html: `
        <h2>مرحباً ${name} 👋</h2>
        <p>اضغطي الزر أدناه لتفعيل حسابك:</p>
        <a href="${verificationUrl}">
          <button style="background-color:#d32f2f;color:white;padding:10px 20px;border:none;border-radius:6px;cursor:pointer;">
            Activate Account
          </button>
        </a>
      `,
    });

    res.status(200).json({ message: "Check your email for activation link" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


exports.approveEmail = async (req, res) => {
  const { email, token } = req.body;

  try {
    const user = await User.findOne({ email, verificationToken: token });
    if (!user) return res.status(400).json({ error: "Invalid link or token" });

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ message: "Account activated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.password !== password)
      return res.status(400).json({ error: "Invalid credentials" });

    if (!user.isVerified)
      return res.status(400).json({ error: "Please verify your email first." });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
