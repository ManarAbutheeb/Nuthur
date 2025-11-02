
const mongoose = require("mongoose");
const reportBaseSchema = require("./ReportBase"); 

const fireReportSchema = new mongoose.Schema({
    ...reportBaseSchema.obj,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: { type: String, required: true },
  image: { type: String },
  status: {
    type: String,
    enum: ["pending", "resolved", "rejected"],
    default: "pending",
  },
  modelConfidence: { type: Number, default: null },
}, { timestamps: true });

module.exports = mongoose.model("volunteerreport", fireReportSchema);

