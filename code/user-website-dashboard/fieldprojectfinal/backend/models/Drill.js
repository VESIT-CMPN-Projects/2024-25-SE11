const mongoose = require("mongoose");

const DrillSchema = new mongoose.Schema({
  location: String,
  time: Date,
  frequency: String, // Monthly, Weekly, etc.
  equipmentCheckReport: String,
  volunteers: [String], // List of volunteers
});

module.exports = mongoose.model("Drill", DrillSchema);
