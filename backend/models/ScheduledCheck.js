const mongoose = require("mongoose");

const ScheduledCheckSchema = new mongoose.Schema({
  location: {
    lat: Number,
    lng: Number,
  },
  weatherData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WeatherData",
  },
  modelPrediction: String,
  modelCheckedAt: Date,
  executedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("ScheduledCheck", ScheduledCheckSchema);
