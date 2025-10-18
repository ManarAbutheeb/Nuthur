// models/VerificationCode.js
const mongoose = require('mongoose');

const verificationCodeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    expires: 60, //  الرمز ينحذف تلقائياً من قاعدة البيانات بعد 10 دقائق (600 ثانية)
  },
});

// تأكد من أن MongoDB ستنشئ index لحذف المستندات المنتهية
verificationCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('VerificationCode', verificationCodeSchema);