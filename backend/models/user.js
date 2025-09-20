const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["volunteer", "employee"], default: "volunteer" }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema); 

// const express = require("express");
// const router = express.Router();
// const User = require("../models/user");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid email or password" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

//     // إنشاء JWT
//     const token = jwt.sign({ id: user._id, role: user.role }, "YOUR_SECRET_KEY");

//     res.json({
//       user: {
//         name: user.name,
//         email: user.email,
//         role: user.role
//       },
//       token
//     });

//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
