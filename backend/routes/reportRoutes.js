const express = require("express");
const FireReport = require("../models/report");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads/';
    // التأكد من وجود مجلد التحميل
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // إنشاء اسم فريد للملف
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
// تصفية الملفات للسماح بالصور فقط
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('يسمح برفع الصور فقط!'), false);
  }
};

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // الحد الأقصى لحجم الملف: 5MB
  }
});


// ميدل وير للتحقق من المستخدم
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
}

// إنشاء بلاغ جديد
router.post("/create", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { description, location } = req.body;

    let imagePath = null;
    if (req.file) {
      imagePath = req.file.path;
    }

    const report = new FireReport({
      user: req.user.id,
      description,
      location,
      image: imagePath,
    });

    await report.save();
    res.json({ message: "Report created", report });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// عرض كل البلاغات (للموظفين)
router.get("/list", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "employee") return res.status(403).json({ error: "Access denied" });
    const reports = await FireReport.find().populate("user", "name email");
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/update/:id", authMiddleware, async (req, res) => {
  try {

    const reportId = req.params.id.trim();
    

    const report = await FireReport.findByIdAndUpdate(
      reportId,
      { status: req.body.status },
      { new: true }
    );
    

    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    
    res.json(report);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(400).json({ error: "Invalid report ID format" });
    }
    
    // معالجة الأخطاء العامة
    res.status(500).json({ error: err.message });
  }
});

router.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, '../uploads', filename);
  
  // التحقق من وجود الملف
  if (!fs.existsSync(imagePath)) {
    return res.status(404).json({ error: "Image not found" });
  }
  
  res.sendFile(imagePath);
});

module.exports = router;