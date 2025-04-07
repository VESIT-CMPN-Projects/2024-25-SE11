const express = require("express");
const SafetyMeasure = require("../models/SafetyMeasure");

const router = express.Router();

// Add a Safety Measure
router.post("/add", async (req, res) => {
  try {
    const newSafetyMeasure = new SafetyMeasure(req.body);
    await newSafetyMeasure.save();
    res.status(201).json({ message: "Safety measure added!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all safety measures
router.get("/", async (req, res) => {
  try {
    const measures = await SafetyMeasure.find();
    res.json(measures);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
