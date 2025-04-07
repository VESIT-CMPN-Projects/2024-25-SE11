const mongoose = require("mongoose");

const drillReportSchema = new mongoose.Schema({
  location: { type: String, required: true },
  drillDate: { type: Date, required: true },
  drillTime: { type: String, required: true },
  frequency: { type: String, required: true },
  notes: { type: String, required: true },
  attachments: [{ type: String }], // Store file URLs or paths
}, { timestamps: true });

module.exports = mongoose.model("DrillReport", drillReportSchema);
