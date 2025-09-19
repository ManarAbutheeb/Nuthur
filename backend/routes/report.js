const express = require("express");
const router = express.Router();
const Report = require("../models/report");

// 1. جلب جميع التقارير
router.get("/", async (req, res) => {
  const reports = await Report.find().populate("user", "name email");
  res.json(reports);
});

// 2. تحديث حالة التقرير
router.put("/:id/status", async (req, res) => {
  const { status } = req.body;
  if (!["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }
  const report = await Report.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(report);
});

module.exports = router;
