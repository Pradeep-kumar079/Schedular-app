const Booking = require("../models/Booking");
const sendEmail = require("../utils/sendMail");
require("dotenv").config();

exports.createBooking = async (req, res) => {
  try {
    const { userId, date, time, bookedBy } = req.body;

    // ✅ check existing booking
    const existing = await Booking.findOne({ userId, date, time });

    if (existing) {
      return res.status(400).json("Slot already booked");
    }

    // ✅ create booking
    const booking = await Booking.create({
      userId,
      date,
      time,
      bookedBy,
    });

    // ✅ get day name
    const day = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });

    // ✅ send email
    const emailSent = await sendEmail(
      bookedBy,
      "🎉 Booking Confirmed",
      `
        <h2>Booking Confirmed 🎉</h2>
        <p>Your meeting is scheduled successfully.</p>

        <p><strong>Day:</strong> ${day}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>

        <br/>
        <p>Thank you for using Scheduler App 🚀</p>
      `
    );

    // ✅ response with message
    res.json({
      booking,
      message: emailSent
        ? "Booking successful & email sent ✅"
        : "Booking successful but email failed ❌",
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
};