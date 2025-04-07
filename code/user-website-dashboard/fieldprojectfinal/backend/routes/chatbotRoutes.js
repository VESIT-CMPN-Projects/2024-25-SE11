const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

router.post("/chat", async (req, res) => {
    const userMessage = req.body.message;
    console.log("🟡 Received message:", userMessage);

    if (!userMessage) {
        return res.status(400).json({ reply: "Please provide a message." });
    }

    try {
        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "gpt-3.5-turbo", 
                messages: [{ role: "user", content: userMessage }],
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("🟢 Raw API Response:", response.data);

        const botReply = response.data.choices?.[0]?.message?.content || "I am unable to process your request.";

        console.log("✅ Bot Reply:", botReply);
        res.json({ reply: botReply });

    } catch (error) {
        console.error("❌ Error:", error.response?.data || error.message);
        res.status(500).json({ reply: "Error fetching response from the chatbot." });
    }
});

module.exports = router;
