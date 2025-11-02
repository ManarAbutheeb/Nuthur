
const mongoose = require("mongoose");


const reportBaseSchema = new mongoose.Schema({
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  weatherData: { type: mongoose.Schema.Types.ObjectId, ref: "WeatherData" },
  modelPrediction: { type: String, default: "Not Yet Analyzed" },
  modelCheckedAt: { type: Date, default: null },
});

module.exports = reportBaseSchema;
