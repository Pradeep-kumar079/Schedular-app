const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bookedBy: String,
  date: String,
  time: String,
});

module.exports = mongoose.model("Booking", bookingSchema);