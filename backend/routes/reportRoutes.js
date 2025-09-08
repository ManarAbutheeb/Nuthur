const express = require("express");
const FireReport = require("../models/report");
const jwt = require("jsonwebtoken");

const router = express.Router();

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
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { description, location, image } = req.body;
    const report = new FireReport({ user: req.user.id, description, location, image });
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
    // تنظيف معرّف التقرير من أي أحرف غير مرغوب فيها (مثل \n)
    const reportId = req.params.id.trim();
    
    // البحث عن التقرير وتحديثه
    const report = await FireReport.findByIdAndUpdate(
      reportId,
      { status: req.body.status },
      { new: true }
    );
    
    // إذا لم يتم العثور على التقرير
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    
    res.json(report);
  } catch (err) {
    // معالجة خطأ CastError بشكل خاص
    if (err.name === 'CastError') {
      return res.status(400).json({ error: "Invalid report ID format" });
    }
    
    // معالجة الأخطاء العامة
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;