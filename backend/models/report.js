const mongoose = require("mongoose");

const fireReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  image: { type: String }, 
  status: {
    type: String,
    enum: ["pending", "resolved", "rejected"],
    default: "pending",
  },
weatherData: { type: mongoose.Schema.Types.ObjectId, ref: "WeatherData" },

  modelPrediction: {
    type: String, 
    default: "Not Yet Analyzed",
  },
  modelConfidence: {
    type: Number,
    default: null,
  },
  modelCheckedAt: {
    type: Date,
    default: null,
  },
 }, { timestamps: true }); 

module.exports = mongoose.model("FireReport", fireReportSchema);


