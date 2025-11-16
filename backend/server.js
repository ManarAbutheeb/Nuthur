const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const cors = require('cors'); 
const ScheduledCheck = require("./models/ScheduledCheck");
const { generateWeatherData } = require("./services/weatherService");
const { runModelPrediction } = require("./controllers/predictModel");
require("dotenv").config();
const User = require("./models/user");
const nodemailer = require("nodemailer"); 

const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const manualCheckRoutes=require("./routes/manualCheckRoutes");
const pdfRoutes = require("./routes/PdfRoutes");
const scheduledCheckRoutes = require("./routes/scheduledCheckRoutes"); 
const contactRoutes = require("./routes/contactRoutes");

const app = express();


// app.use(cors({
//   origin: ["http://localhost:3000", "https://nuthur.up.railway.app"],  
//   credentials: true
// }));
app.use(cors());


app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  },
});


cron.schedule("0 */8 * * *", async () => {
// cron.schedule("* * * * *", async () => {

  console.log(" Running automatic weather check...");
  try {
    const lat = 18.2353699; // السودة
    const lng = 42.3895230;

    const weatherRecord = await generateWeatherData(lat, lng, null);
    const now = new Date();
    const prediction = await runModelPrediction({
      day: now.getDate(),
      month: now.getMonth() + 1,
      year: now.getFullYear(),
      Temperature: weatherRecord.temperature,
      RH: weatherRecord.humidity,
      Ws: weatherRecord.windSpeed,
      Rain: weatherRecord.rainfall,
      FFMC: weatherRecord.indices.ffmc,
      DMC: weatherRecord.indices.dmc,
      DC: weatherRecord.indices.dc,
      ISI: weatherRecord.indices.isi,
      BUI: weatherRecord.indices.bui,
      FWI: weatherRecord.indices.fwi,
    });

    const check = new ScheduledCheck({
      location: { lat, lng },
      weatherData: weatherRecord._id,
      modelPrediction: prediction.prediction === 1 ? "High Risk" : "No Risk",
      modelCheckedAt: new Date()
    });

    await check.save();
    console.log(" Scheduled check saved:", check.modelPrediction);

   
    if (check.modelPrediction === "High Risk") {
      const volunteers = await User.find({ role: "volunteer", isVerified: true });

      for (const vol of volunteers) {
        await transporter.sendMail({
          from: `"Nuthur Support" <${process.env.EMAIL_USER}>`,
          to: vol.email,
          subject: " تنبيه: خطر حريق في منطقة السودة",
          html: `<p>مرحباً ${vol.name},</p>
                 <p>تنبيه! نموذج النظام توقع وجود خطر حريق عالي في منطقة السودة حالياً.</p>
                 <p>يرجى أخذ الحيطة والحذر.</p>`,
        });
      }
    }

  } catch (err) {
    console.error(" Scheduled check failed:", err.message);
  }
});


app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/weatherData", weatherRoutes);
app.use("/api/manual-checks",manualCheckRoutes );
app.use("/api/pdf", pdfRoutes);
app.use("/api/scheduled-checks", scheduledCheckRoutes);
app.use("/api/contact", contactRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
