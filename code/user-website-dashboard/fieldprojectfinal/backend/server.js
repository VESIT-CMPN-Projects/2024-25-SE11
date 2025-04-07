require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection - Remove deprecated options
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Connection Error:", err));

// Import Routes
const incidentRoutes = require("./routes/incidentRoutes");
const safetyRoutes = require("./routes/safety");
const drillRoutes = require("./routes/drill");
const chatbotRoutes = require("./routes/chatbotRoutes");
const communityRoutes = require("./routes/communityRoutes");
const authRoutes = require("./routes/authRoutes"); // New auth routes

// Use Routes
app.use("/api/incidents", incidentRoutes);
app.use("/api/safety", safetyRoutes);
app.use("/api/drills", drillRoutes);
app.use("/api/chatbot", chatbotRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/auth", authRoutes); // Add authentication routes

// Default Route
app.get("/", (req, res) => {
  res.send("🔥 Firefighter Safety API is running!");
});

// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));