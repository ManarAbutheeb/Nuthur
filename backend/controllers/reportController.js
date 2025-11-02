const VolunteerReport = require("../models/volunteerreport");
const { sendEmail } = require("../services/emailService");


exports.updateReportStatus = async (req, res) => {
  const { reportId, status } = req.body;
  try {
    const report = await VolunteerReport.findById(reportId).populate("user");
    if (!report) return res.status(404).json({ error: "Report not found" });

    report.status = status;
    await report.save();

    let subject = "تحديث على تقريرك";
    let message = status === "resolved" ? "تم حل مشكلتك " : "تم رفض مشكلتك ";
    await sendEmail(report.user.email, subject, `<p>${message}</p>`);

    res.status(200).json({ message: "Status updated and email sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
