const express = require("express");
const axios = require("axios");
require("dotenv").config(); // Load .env file

const router = express.Router();

const API_HOST = "streaming-availability.p.rapidapi.com";
const API_KEY = process.env.API_KEY; // Securely load the API key

// 🎬 Route to search for movies with filters

router.get("/search", async (req, res) => {
    const {
        
        year_max,
        year_min,
        show_original_language,
        show_type,
        rating_min,
        rating_max,
        genres,
        keyword,
        catalogs
    } = req.query; // Extract search parameters from the request query

    if (!keyword) {
        return res.status(400).json({ error: "Keyword is required for searching." });
    }

    const options = {
        method: "GET",
        url: `https://${API_HOST}/shows/search/filters`,
        params: {
            country,
            year_max,
            year_min,
            show_original_language,
            show_type,
            rating_min,
            rating_max,
            genres,
            keyword,
            catalogs,
            genres_relation: "and",
            order_direction: "asc",
            order_by: "original_title",
            output_language: "en"
        },
        headers: {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": API_HOST
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch movie data", details: error.message });
    }
});


module.exports = router;
