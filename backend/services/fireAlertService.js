const FireIndexState = require("../models/FireIndexState");
const User = require("../models/user");
const { sendEmail } = require("./emailService");
const cron = require("node-cron");

async function sendFireAlert() {
  try {
    const fireState = await FireIndexState.findOne({ location: "alsoudah" });
    const now = new Date();

    if (!fireState.lastUpdate || (now - fireState.lastUpdate) / 1000 / 60 > 60) {
      fireState.lastUpdate = now;
      await fireState.save();

      const volunteers = await User.find({ region: "Soudah" });
      for (let v of volunteers) {
        await sendEmail(v.email, "تنبيه حريق 🔥", "<p>تم رصد حريق في منطقة السودة. الرجاء أخذ الحيطة والحذر.</p>");
      }
      console.log("Fire alerts sent!");
    }
  } catch (err) {
    console.error(err);
  }
}

// تشغيل تلقائي كل ساعة
cron.schedule("0 * * * *", sendFireAlert);

module.exports = { sendFireAlert };
