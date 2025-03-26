const express = require("express");
const axios = require("axios");
require("dotenv").config(); // Load environment variables

const router = express.Router();

const API_HOST = "imdb236.p.rapidapi.com";
const API_KEY = process.env.API_KEY; // Store in .env file

router.get("/search", async (req, res) => {
    const { originalTitleAutocomplete, genre, averageRatingFrom, numVotesFrom, rows, startYearFrom, sortOrder, sortField } = req.query;
    const options = {
        method: "GET",
        url: "https://imdb236.p.rapidapi.com/imdb/search",
        params: {
            originalTitleAutocomplete: originalTitleAutocomplete,
            type: 'movie',
            genre: genre,
            averageRatingFrom: averageRatingFrom,
            numVotesFrom: numVotesFrom,
            rows: rows || "5",
            startYearFrom: startYearFrom,
            sortOrder: sortOrder || "ASC",
            sortField: sortField || "numVotes"
        },
        headers: {
            "x-rapidapi-key": process.env.API_KEY,  // Use environment variable
            "x-rapidapi-host": process.env.API_HOST,
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data); // Send the data as response
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch movies" });
    }
});

router.get("/movieId", async (req, res) => {
    const { id } = req.query; // Extract IMDb ID from the request URL

    const options = {
        method: "GET",
        url: `https://imdb236.p.rapidapi.com/imdb/${id}`, // Use dynamic ID
        headers: {
            "x-rapidapi-key": API_KEY, // Use environment variables for security
            "x-rapidapi-host": API_HOST
        }
    };

    try {
        const response = await axios.request(options);
        res.json(response.data); // Send the fetched movie data as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch movie details" });
    }
});

router.get("/popularMovies", async (req, res) => {
    const options = {
        method: "GET",
        url: "https://imdb236.p.rapidapi.com/imdb/most-popular-movies",
        headers: {
            "x-rapidapi-key": process.env.API_KEY, // Use environment variables for security
            "x-rapidapi-host": process.env.API_HOST,
        },
    };

    try {
        const response = await axios.request(options);
        res.json(response.data); // Send the fetched data as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch most popular movies" });
    }
});

module.exports = router;
