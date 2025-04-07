const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  location: { type: String, required: true },
  incidentDate: { type: Date, required: true },
  incidentTime: { type: String, required: true },
  incidentType: { type: String, required: true },
  severity: { type: String, required: true },
  actionTaken: { type: String },
  casualties: { type: Boolean, required: true },
  casualtyDetails: { type: String },
  detailedReport: { type: String },
  reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});



module.exports = mongoose.model('Incident', incidentSchema);
