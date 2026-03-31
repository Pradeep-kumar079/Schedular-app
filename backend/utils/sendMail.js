const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, html) => {
  try {
    await sgMail.send({
      to,
      from: process.env.EMAIL_FROM,
      subject,
      html,
    });

    console.log("✅ Email sent via SendGrid");
  } catch (err) {
    console.log("❌ SendGrid error:", err.response?.body || err.message);
  }
};

module.exports = sendEmail;