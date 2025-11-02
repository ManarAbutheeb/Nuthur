const express = require("express");
const Report = require("../models/VolunterReport");
const { generateWeatherData } = require("../services/weatherService");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const { execFile } = require("child_process");
const fs = require("fs");
const authMiddleware = require("../middleware/authMiddleware"); 
const { runModelPrediction } = require("../controllers/predictModel");

const router = express.Router();


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
  limits: { fileSize: 5 * 1024 * 1024 }, 
});



router.post("/create", authMiddleware, upload.single("image"), async (req, res) => {
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

    const weatherData = await generateWeatherData(location.lat, location.lng, report._id);
    const now = new Date();
const predictionInput = {
  day: now.getDate(),
  month: now.getMonth() + 1,
  year: now.getFullYear(),
  Temperature: weatherData.temperature,
  RH: weatherData.humidity,
  Ws: weatherData.windSpeed,
  Rain: weatherData.rainfall,
  FFMC: weatherData.indices.ffmc,
  DMC: weatherData.indices.dmc,
  DC: weatherData.indices.dc,
  ISI: weatherData.indices.isi,
  BUI: weatherData.indices.bui,
  FWI: weatherData.indices.fwi
};

const prediction = await runModelPrediction(predictionInput);


    report.modelPrediction = prediction.prediction === 1 ? "High Risk" : "No Risk";
    report.modelCheckedAt = new Date();


    await report.save();
    res.json({ message: "Report created", report });

  


  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get("/", authMiddleware, async (req, res) => {
  try {
    const reports = await Report.find().populate("user", "name email");
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "resolved", "rejected"].includes(status)) {
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


router.get("/image/:filename", (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, "../uploads", filename);

  if (!fs.existsSync(imagePath)) return res.status(404).json({ error: "Image not found" });

  res.sendFile(imagePath);
});


router.get("/my-reports", authMiddleware, async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});


module.exports = router;
