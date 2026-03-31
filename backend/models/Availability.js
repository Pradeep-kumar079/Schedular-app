const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  day: String,
  startTime: String,
  endTime: String,
});

module.exports = mongoose.model("Availability", availabilitySchema);