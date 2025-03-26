const express = require("express");
const router = express.Router();
const db = require("../db"); // Adjust the path to your database connection file
const authenticateUser = require("../routes/authenticateuser"); // Adjust if needed

router.post("/movies", authenticateUser, (req, res) => {
    const { api_id, title, poster, release_year, status, rating } = req.body;
    const user_id = req.user.id; // Authenticated user ID
    
        if (!api_id || !title || !status) {
            return res.status(400).json({ error: "Movie ID, title, and status are required" });
        }
    
        // Step 1: Check if movie exists in the database
        db.query("SELECT movie_id FROM movies WHERE movie_id = ?", [api_id], (err, results) => {
            if (err) return res.status(500).json({ error: "Database error", details: err.sqlMessage });
    
            if (results.length > 0) {
                insertOrUpdateUserMovie(api_id); // Movie exists, proceed
            } 
            else {
                // Insert new movie with api_id
                db.query(
                    "INSERT INTO movies (movie_id, title, poster, year) VALUES (?, ?, ?, ?)",
                    [api_id, title, poster, release_year],
                    (err) => {
                        if (err) return res.status(500).json({ error: "Movies table insert error", details: err.sqlMessage });
                        insertOrUpdateUserMovie(api_id); // Use api_id
                    }
                );
            }
        });
    
        // Step 2: Insert into user_movies or update if exists
    function insertOrUpdateUserMovie(movie_id) {
            db.query(
                "SELECT * FROM user_movies WHERE user_id = ? AND movie_id = ?",
                [user_id, movie_id],
                (err, results) => {
                    if (err) return res.status(500).json({ error: "Database error", details: err.sqlMessage });
    
                    if (results.length > 0) {
                        // Update status and rating if already exists
                        db.query(
                            "UPDATE user_movies SET status = ?, rating = ? WHERE user_id = ? AND movie_id = ?",
                            [status, rating, user_id, movie_id],
                            (err) => {
                                if (err) return res.status(500).json({ error: "Database update error", details: err.sqlMessage });
                                res.json({ message: "Movie updated successfully" });
                            }
                        );
                    } else {
                        // Insert new record for user
                        db.query(
                            "INSERT INTO user_movies (user_id, movie_id, status, rating) VALUES (?, ?, ?, ?)",
                            [user_id, movie_id, status, rating || null],
                            (err) => {
                                if (err) return res.status(500).json({ error: "Database insert error at user_movies table", details: err.sqlMessage });
                                res.json({ message: "Movie added successfully" });
                            }
                        );
                    }
                }
            );
        }
});

module.exports = router;
