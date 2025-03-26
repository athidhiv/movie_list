require("dotenv").config();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const router = express.Router();

const app = express();
app.use(express.json()); // Middleware to parse JSON

const SECRET_KEY = process.env.SECRET_KEY || "your_default_secret";
const db = require("../db");

// 🔐 User Login
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.sqlMessage });
        if (results.length === 0) return res.status(401).json({ error: "Invalid credentials" });

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
        res.json({ message: `Login successful, ${user.username}.`, token });
    });
});

// 📝 User Signup
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    db.query("SELECT * FROM users WHERE email = ? OR username = ?", [email, username], async (err, results) => {
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({ error: "Database error", details: err.sqlMessage });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: "Email or username already exists" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user
        db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
        [username, email, hashedPassword], 
        (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: "Username or Email already exists" });
                }
                console.error("Database Insert Error:", err);
                return res.status(500).json({ error: "Database insert error", details: err.sqlMessage });
            }
            res.json({ message: "User registered successfully" });
        });
    });
});
module.exports = router;