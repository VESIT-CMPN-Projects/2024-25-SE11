const mongoose = require("mongoose");

const SafetyMeasureSchema = new mongoose.Schema({
  category: String, // Home, Office, Road, etc.
  steps: [String], // List of safety steps
  videoLinks: [String], // Links to training videos
});

module.exports = mongoose.model("SafetyMeasure", SafetyMeasureSchema);
