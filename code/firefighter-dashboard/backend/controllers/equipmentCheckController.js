const EquipmentCheck = require("../models/EquipmentCheck");

const addEquipmentItem = async (req, res) => {
    try {
        const { name, category } = req.body;

        if (!name || !category) {
            return res.status(400).json({ message: "Name and category are required" });
        }

        const newItem = {
            name,
            category,
            checked: false,
            condition: "good",
            notes: "",
        };

        // Find the most recent equipment check report and update it
        let latestCheck = await EquipmentCheck.findOne().sort({ submittedAt: -1 });

        if (!latestCheck) {
            // If no report exists, create a new one
            latestCheck = new EquipmentCheck({ equipment: [newItem] });
        } else {
            latestCheck.equipment.push(newItem);
        }

        await latestCheck.save();

        res.status(201).json({ message: "Equipment item added", data: latestCheck });
    } catch (error) {
        console.error("Error adding equipment item:", error);
        res.status(500).json({ message: "server Error" });
    }
};

// Get all Equipment Check Reports
const getEquipmentChecks = async (req, res) => {
    try {
        const reports = await EquipmentCheck.find().sort({ submittedAt: -1 });
        res.status(200).json(reports);
    } catch (error) {
        console.error("Error fetching equipment checks:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Submit an Equipment Check
const submitEquipmentCheck = async (req, res) => {
    try {
        const { equipment } = req.body;

        // Ensure at least one item is checked before submission
        const uncheckedItems = equipment.filter((item) => !item.checked);
        if (uncheckedItems.length > 0) {
            return res.status(400).json({ message: "All items must be checked before submission" });
        }

        const newCheck = new EquipmentCheck({ equipment });
        await newCheck.save();

        res.status(201).json({ message: "Equipment check submitted successfully", data: newCheck });
    } catch (error) {
        console.error("Error submitting equipment check:", error);
        res.status(500).json({ message: "Server Error" });
    }
};

module.exports = { getEquipmentChecks, submitEquipmentCheck, addEquipmentItem};