const express = require("express");
const router = express.Router();
const Incident = require("../models/Incident");  // Ensure this file exists!

// POST - Add an incident
router.post("/", async (req, res) => {
    try {
        const { location, type, severity, actionTaken, casualty } = req.body;
        const newIncident = new Incident({ location, type, severity, actionTaken, casualty });
        await newIncident.save();
        res.status(201).json({ message: "Incident reported successfully", incident: newIncident });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get("/", async (req, res) => {
  try {
      const incidents = await Incident.find();  // Fetch all incidents from MongoDB
      res.status(200).json(incidents);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

module.exports = router;
