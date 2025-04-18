const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    let token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    if (token.startsWith("Bearer ")) {
        token = token.slice(7); // Remove "Bearer " (7 characters)
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Attach user data to request
        next();
    } catch (error) {
        console.error("Auth Error:", error);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session expired. Please log in again. "});
        } else {
            res.status(400).json({ message: "Invalid token." });
        }
    }
};

module.exports = authMiddleware;
