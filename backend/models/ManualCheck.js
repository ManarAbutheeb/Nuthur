
const mongoose = require("mongoose");
const reportBaseSchema = require("./ReportBase");

const manualCheckSchema = new mongoose.Schema({
   ...reportBaseSchema.obj,
  employee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

module.exports = mongoose.model("ManualCheck", manualCheckSchema);
