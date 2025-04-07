const express = require("express");
const { logIncident, getIncidents } = require("../controllers/incidentController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, logIncident);
router.get("/", getIncidents);

module.exports = router;
