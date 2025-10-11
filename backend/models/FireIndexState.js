const mongoose = require("mongoose");

const fireIndexStateSchema = new mongoose.Schema({
  location: {
    type: String,
    default: "alsoudah", // لأن النظام مخصص لهذه المنطقة فقط
    unique: true
  },
  lastFFMC: { type: Number, default: 85 }, // القيم الابتدائية لأول مرة فقط
  lastDMC: { type: Number, default: 6 },
  lastDC: { type: Number, default: 15 },
  lastUpdate: { type: Date, default: null }
});

module.exports = mongoose.model("FireIndexState", fireIndexStateSchema);
