const express = require("express");
const axios = require("axios");

require("dotenv").config(); // Load environment variables

const router = express.Router();
const OMDB_API_KEY = process.env.OMDB_API_KEY; // Secure API key

// 🎬 Get details of a specific movie by title
router.get('/movies', async (req, res) => {
    const { title } = req.query;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&t=${title}`);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching movie:", error);
        res.status(500).json({ error: 'Error fetching movie details' });
    }
});

// 🔍 Search multiple movies
router.get('/search', async (req, res) => {
    console.log("Query params:", req.query);
    const { title } = req.query;
    if (!title) return res.status(400).json({ error: 'Query is required' });

    try {
        const response = await axios.get(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}`);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching search results:", error);
        res.status(500).json({ error: 'Error fetching search results' });
    }
});

module.exports = router; // Export router
