const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Received login request for:", email); // Debug log

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found in database");
            return res.status(401).json({ message: "User not found" });
        }

        console.log("User found:", user);

        // Validate password
        if (password != user.password) {
            console.log("Password does not match");
            return res.status(401).json({ message: "Invalid Password" });
        }

        console.log("Login successful for:", email);

        // Generate JWT Token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ token, user: {email: user.email, role: user.role} });
    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ message: "Server error"});
    }
};

module.exports = { loginUser }