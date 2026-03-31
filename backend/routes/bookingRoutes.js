const express = require("express");
const router = express.Router();

const Booking = require("../models/Booking");
const { createBooking } = require("../controllers/bookingController");

// ✅ Create booking
router.post("/", createBooking);

// ✅ Get bookings (FIXED)
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // 🔥 FIX: validate userId
    if (!userId) {
      return res.status(400).json("UserId is required");
    }

    const bookings = await Booking.find({ userId });
    res.json(bookings);

  } catch (err) {
    res.status(500).json(err.message);
  }
});

module.exports = router;