require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const incidentRoutes = require("./routes/incidentRoutes");
const dashboardRoues = require("./routes/dashboardRoutes");
const drillReports = require("./routes/drillReports");
const equipmentCheckRoutes = require("./routes/equipmentCheckRoutes");

const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:8080"], // Allow both frontend origins
  credentials: true,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/dashboard", dashboardRoues);
app.use("/api/drills", drillReports);
app.use("/api/equipment-checks", equipmentCheckRoutes);

// Root API check
app.get("/", (req, res) => {
  res.json({ message: "API is working!" });
});

app.get("/api/incidents", async (req, res) => {
  try {
      const incidents = await Incident.find();  // Fetch incidents from DB
      res.json(incidents);
  } catch (error) {
      console.error("Error fetching incidents:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});


// Database Connection & Server Start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));
