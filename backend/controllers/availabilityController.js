const Availability = require("../models/Availability");

// Create availability
exports.createAvailability = async (req, res) => {
  try {
    const { userId, day, startTime, endTime } = req.body;

    const slot = await Availability.create({
      userId,
      day,
      startTime,
      endTime,
    });

    res.json(slot);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

// Get availability
exports.getAvailability = async (req, res) => {
  try {
    const { userId } = req.params;

    const slots = await Availability.find({ userId });

    res.json(slots);
  } catch (err) {
    res.status(500).json(err.message);
  }
};