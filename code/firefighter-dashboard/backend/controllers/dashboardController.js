const Incident = require("../models/incidentModel");
const User = require("../models/userModel");

const getDashboardStats = async (req, res) => {
    try {
        const incidentsThisMonth = await Incident.countDocuments({
            incidentDate: { $gte: new Date(new Date().setDate(1)) }, // Incidents from the start of the month
        });

        const firefighterOnDuty = await User.countDocuments({ role: "firefighter" });

        // Example placeholders (update as needed)
        const drillsCompleted = 8;
        const equipmentCheckDue = 3;

        res.json({ incidentsThisMonth, firefighterOnDuty, drillsCompleted, equipmentCheckDue });
    } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { getDashboardStats };