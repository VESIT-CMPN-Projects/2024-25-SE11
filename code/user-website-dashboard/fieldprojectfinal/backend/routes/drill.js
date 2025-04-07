const express = require("express");
const Drill = require("../models/Drill");

const router = express.Router();

// Add a Drill
router.post("/add", async (req, res) => {
  try {
    const newDrill = new Drill(req.body);
    await newDrill.save();
    res.status(201).json({ message: "Drill added!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all Drills
router.get("/", async (req, res) => {
  try {
    const drills = await Drill.find();
    res.json(drills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
