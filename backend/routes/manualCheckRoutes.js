const express = require("express");
const router = express.Router();
const ManualCheck = require("../models/ManualCheck");
const { generateWeatherData } = require("../services/weatherService");
const { runModelPrediction } = require("../controllers/predictModel");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/", authMiddleware, async (req, res) => {
  try {
    const { location } = req.body;
    const employeeId = req.user.id;

  
    const weatherRecord = await generateWeatherData(location.lat, location.lng, null);

  
    const now = new Date();
const prediction = await runModelPrediction({
  day: now.getDate(),
  month: now.getMonth() + 1,
  year: now.getFullYear(),
  Temperature: weatherRecord.temperature,
  RH: weatherRecord.humidity,
  Ws: weatherRecord.windSpeed,
  Rain: weatherRecord.rainfall,
  FFMC: weatherRecord.indices.ffmc,
  DMC: weatherRecord.indices.dmc,
  DC: weatherRecord.indices.dc,
  ISI: weatherRecord.indices.isi,
  BUI: weatherRecord.indices.bui,
  FWI: weatherRecord.indices.fwi,
});

 
    const check = new ManualCheck({
      employee: employeeId,
      location: { lat: location.lat, lng: location.lng },
      weatherData: weatherRecord._id,
      modelPrediction: prediction.prediction === 1 ? "High Risk" : "No Risk",
      modelCheckedAt: new Date()
    });

    await check.save();

    res.json({
      message: "Manual weather check completed successfully",
      check
    });
  } catch (err) {
    console.error(" Manual check error:", err);
    res.status(500).json({ error: "Failed to check weather" });
  }
});


router.get("/", authMiddleware, async (req, res) => {
  try {
    const checks = await ManualCheck.find()
      .populate("employee", "name email")
      .populate("weatherData")
      .sort({ createdAt: -1 });
    res.json(checks);
  } catch (err) {
    console.error("❌ Fetch manual checks error:", err);
    res.status(500).json({ error: "Failed to fetch manual checks" });
  }
});

module.exports = router;
