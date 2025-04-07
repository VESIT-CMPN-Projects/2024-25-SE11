const mongoose = require("mongoose");

const IncidentSchema = new mongoose.Schema({
  location: { type: String, required: true },
  incidentDate: { type: Date, required: true }, // Consider using Date type for better querying
  incidentType: { type: String, required: true },
  severity: { type: String, required: true },
});

const Incident = mongoose.model("Incident", IncidentSchema);

module.exports = Incident;
