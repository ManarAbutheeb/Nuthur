
const mongoose = require("mongoose");
const reportBaseSchema = require("./ReportBase");

const scheduledCheckSchema = new mongoose.Schema({
    ...reportBaseSchema.obj,
}, { timestamps: true });

module.exports = mongoose.models.ScheduledCheck || mongoose.model("ScheduledCheck", scheduledCheckSchema);
