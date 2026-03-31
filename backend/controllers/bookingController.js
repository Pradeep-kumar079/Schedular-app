const Booking = require("../models/Booking");
const sendEmail = require("../utils/sendMail");
require("dotenv").config();

exports.createBooking = async (req, res) => {
  try {
    const { userId, date, time, bookedBy } = req.body;

    const existing = await Booking.findOne({ userId, date, time });

    if (existing) {
      return res.status(400).json("Slot already booked");
    }

    const booking = await Booking.create({
      userId,
      date,
      time,
      bookedBy,
    });

    // 🔥 FORMAT DAY
    const day = new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
    });

    // 🔥 SEND EMAIL
    await sendEmail(
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

    res.json(booking);

  } catch (err) {
    res.status(500).json(err.message);
  }
};