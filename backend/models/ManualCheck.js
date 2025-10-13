const mongoose = require("mongoose");

const manualCheckSchema = new mongoose.Schema({
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  location: {
    lat: Number,
    lng: Number,
  },
  weatherData: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "WeatherData", 
    required: true 
  },

  modelPrediction: { type: String },  // High Risk / Low Risk
  modelCheckedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("ManualCheck", manualCheckSchema);
