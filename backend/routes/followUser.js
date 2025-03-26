const express = require("express");
const db = require("../db"); // Assuming you have a db connection file
const authenticateUser = require("../routes/authenticateuser"); // Import middleware
const router = express.Router();

/**
 * Follow another user
 */
router.post("/follow", authenticateUser, (req, res) => {
    const { target_username } = req.body; // User to follow
    const follower_id = req.user.id; // Authenticated user

    if (!target_username) {
        return res.status(400).json({ error: "Target username is required" });
    }

    // Get target user's ID from username
    db.query("SELECT id FROM users WHERE username = ?", [target_username], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error", details: err.sqlMessage });

        if (results.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const target_id = results[0].id;

        if (target_id === follower_id) {
            return res.status(400).json({ error: "You cannot follow yourself" });
        }

        // Insert into user_followers table
        db.query(
            "INSERT INTO user_followers (follower_id, following_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE follower_id = follower_id",
            [follower_id, target_id],
            (err) => {
                if (err) return res.status(500).json({ error: "Database insert error", details: err.sqlMessage });
                res.json({ message: "Followed successfully" });
            }
        );
    });
});

/**
 * Get list of users a user is following
 */
router.get("/following", authenticateUser, (req, res) => {
    const user_id = req.user.id;

    db.query(
        "SELECT users.username FROM user_followers JOIN users ON user_followers.following_id = users.id WHERE user_followers.follower_id = ?",
        [user_id],
        (err, results) => {
            if (err) return res.status(500).json({ error: "Database error", details: err.sqlMessage });
            res.json({ following: results.map(user => user.username) });
        }
    );
});

/**
 * Search users by username
 */
router.get("/search", authenticateUser, (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).json({ error: "Username is required for search" });
    }

    db.query(
        "SELECT id, username FROM users WHERE username LIKE ? LIMIT 10",
        [`%${username}%`],
        (err, results) => {
            if (err) return res.status(500).json({ error: "Database error", details: err.sqlMessage });
            res.json({ users: results });
        }
    );
});

module.exports = router;
