const mongoose = require("mongoose");

const fireReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  image: { type: String }, // تخزين رابط الصورة
  status: { type: String, enum: ["pending", "resolved", "rejected"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.model("FireReport", fireReportSchema);


// models/Report.js

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Report", reportSchema);

