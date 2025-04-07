const mongoose = require("mongoose");

const IncidentSchema = new mongoose.Schema({
    location: { type: String, required: true },
    type: { type: String, required: true },
    severity: { type: String, required: true },
    actionTaken: { type: String, required: true },
    casualty: { type: Number, required: true }
});

module.exports = mongoose.model("Incident", IncidentSchema);
