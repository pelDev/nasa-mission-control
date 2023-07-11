const mongoose = require("mongoose");

const launchSchema = new mongoose.Schema({
  flightNumber: {
    type: Number,
    required: true,
  },
  launchDate: {
    type: Date,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  rocket: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  upcoming: {
    type: Boolean,
    default: true,
  },
  success: {
    type: Boolean,
    default: true,
  },
  customers: [String],
});

module.exports = mongoose.model("Launch", launchSchema);
