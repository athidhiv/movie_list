const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key"; // Ensure you have your secret key

const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), SECRET_KEY);
        req.user = decoded; // Attach decoded user info to req.user
        next(); // Move to the next middleware/route
    } catch (err) {
        res.status(400).json({ error: "Invalid token" });
    }
};

module.exports = authenticateUser;
