const express = require("express");
const router = express.Router();
const ScheduledCheck = require("../models/ScheduledCheck");

// عرض كل التشييكات التلقائية
router.get("/", async (req, res) => {
  try {
    const checks = await ScheduledCheck.find()
      .populate("weatherData")
      .sort({ executedAt: -1 });
    res.json(checks);
  } catch (err) {
    console.error("❌ Fetch scheduled checks error:", err);
    res.status(500).json({ error: "Failed to fetch scheduled checks" });
  }
});

module.exports = router;
