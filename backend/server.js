const express = require("express");
const mongoose = require("mongoose");

const cors = require('cors'); // 👈 استدعاء المكتبة
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const manualCheckRoutes=require("./routes/manualCheckRoutes");
const pdfRoutes = require("./routes/PdfRoutes");
const app = express();
app.use(express.json());

app.use(cors());

// اتصال بقاعدة البيانات
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

// ربط الراوتات
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/weatherData", weatherRoutes);
app.use("/api/manual-checks",manualCheckRoutes );

app.use("/api/pdf", pdfRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
