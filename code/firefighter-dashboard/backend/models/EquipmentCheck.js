const mongoose = require("mongoose");

const EquipmentCheckSchema = new mongoose.Schema(
    {
        equipment: [
            {
                name: String,
                category: String,
                checked: Boolean,
                condition: {
                    type: String,
                    enum: ["good", "fair", "poor", "damaged", "missing"],
                },
                notes: String,
            },
        ],
        submittedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("EquipmentCheck", EquipmentCheckSchema);