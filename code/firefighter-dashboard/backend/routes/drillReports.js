const express = require("express");

const multer = require("multer");
const DrillReport = require("../models/DrillReports")

const router = express.Router();

// Configure file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Save files in an "uploads" directory
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

// POST - Submit Drill Report
router.post("/", upload.array("files", 5), async (req, res) => {
    try {
        const { location, drillDate, drillTime, frequency, notes } = req.body;
        const attachments = req.files.map((file) => file.path); // Get file paths

        const newDrillReport = new DrillReport({
            location,
            drillDate,
            drillTime,
            frequency,
            notes,
            attachments,
        });

        await newDrillReport.save();
        res.status(201).json({ message: "Drill report submitted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error submitting drill report" });
    }
});

// GET - Fetch All Drill Reports
router.get("/", async (req, res) => {
    try {
        const reports = await DrillReport.find().sort({ createdAt: -1});
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ error: "Error fetching drill reports" });
    }
});

module.exports = router;