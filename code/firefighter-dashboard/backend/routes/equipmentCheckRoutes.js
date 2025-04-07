const express = require("express");
const router = express.Router();
const {
    getEquipmentChecks,
    submitEquipmentCheck,
    addEquipmentItem,
} = require("../controllers/equipmentCheckController");

// Get all equipment checks
router.get("/", getEquipmentChecks);

router.post("/submit", submitEquipmentCheck);

router.post("/add-item", addEquipmentItem);

module.exports = router;