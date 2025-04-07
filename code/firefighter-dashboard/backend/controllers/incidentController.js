const Incident = require("../models/incidentModel");

const logIncident = async (req, res) => {
    try {
        console.log("Received Incident Data:", req.body);  // Debugging
        console.log("User ID from Token:", req.user.id);   // Debugging

        const { location, incidentDate, incidentTime, incidentType, severity, actionTaken, casualties, casualtyDetails, detailedReport } = req.body;
        const newIncident = new Incident({
            location,
            incidentDate,
            incidentTime,
            incidentType,
            severity,
            actionTaken,
            casualties,
            casualtyDetails,
            detailedReport,
            reportedBy: req.user.id
        });

        await newIncident.save();
        res.status(201).json({ message: "Incident logged successfully." });
    } catch (error) {
        console.error("❌ Error logging incident:", error);  // Print error details
        res.status(500).json({ message: "Server error." });
    }
};


const getIncidents = async (req, res) => {
    try {
        const incidents = await Incident.find().populate("reportedBy", "email").sort({ incidentDate: -1 });
        res.json(incidents);
    } catch (error) {
        res.status(500).json({ message: "Server error." });
    }
};

module.exports = { logIncident, getIncidents };
