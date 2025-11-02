
const mongoose = require("mongoose");

const weatherDataSchema = new mongoose.Schema({
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  windSpeed: { type: Number, required: true },
  rainfall: { type: Number, required: true },
  
 
  indices: {
    ffmc: Number, 
    dmc: Number,   
    dc: Number,    
    isi: Number,   
    bui: Number,   
    fwi: Number    
  },
  

  report: { type: mongoose.Schema.Types.ObjectId, ref: "FireReport" },
  
  fetchedAt: { type: Date, default: Date.now }
}, { timestamps: true });


weatherDataSchema.index({ location: "2dsphere" });
weatherDataSchema.index({ fetchedAt: -1 });

module.exports = mongoose.model("WeatherData", weatherDataSchema);