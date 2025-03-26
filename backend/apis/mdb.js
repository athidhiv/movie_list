const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

const API_HOST = "movie-database-api1.p.rapidapi.com";
const API_KEY = process.env.API_KEY; // Securely load API key

// 🎬 Route to fetch movie suggestions
router.get("/suggestions", async (req, res) => {
    const options = {
        method: "GET",
        url: `https://${API_HOST}/movie_suggestions.json`,
        headers: {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": API_HOST
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movie suggestions", details: error.message });
    }
});

module.exports = router;
