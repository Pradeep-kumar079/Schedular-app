const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    await sgMail.send({
      to,
      from: process.env.EMAIL_FROM, // must be verified in SendGrid
      subject,
      html,
    });

    console.log("✅ Email sent via SendGrid");
    return true; // ✅ success

  } catch (err) {
    console.log("❌ SendGrid error:", err.response?.body || err.message);
    return false; // ❌ failed
  }
};

module.exports = sendEmail;