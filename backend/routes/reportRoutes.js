const express = require("express");
const Report = require("../models/report");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const authMiddleware = require("../middleware/authMiddleware"); // 👈 استدعاء 

const router = express.Router();

// إعداد التخزين للصور
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) cb(null, true);
  else cb(new Error("يسمح برفع الصور فقط!"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

// Middleware للتحقق من JWT
// function authMiddleware(req, res, next) {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ error: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ error: "Invalid token" });
//   }
// }

/* ============================
        ROUTES
============================ */

// 1. إنشاء تقرير
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { description, location } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const report = new Report({
      user: req.user.id,
      description,
      location,
      image: imagePath,
      status: "pending",
    });

    await report.save();
    res.json({ message: "Report created", report });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 2. جلب كل التقارير
router.get("/", authMiddleware, async (req, res) => {
  try {
    const reports = await Report.find().populate("user", "name email");
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. تحديث حالة التقرير
router.put("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const report = await Report.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!report) return res.status(404).json({ error: "Report not found" });

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. جلب صورة التقرير
router.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, "../uploads", filename);

  if (!fs.existsSync(imagePath)) return res.status(404).json({ error: "Image not found" });

  res.sendFile(imagePath);
});

module.exports = router;
// // جلب جميع التقارير
// router.get("/", async (req, res) => {
//   try {
//     const reports = await Report.find().populate("user", "name email");
//     res.json(reports);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
