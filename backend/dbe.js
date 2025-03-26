import dotenv from "dotenv";
import axios from "axios";
import mysql from "mysql2/promise";
import express from "express";
import cors from "cors";

dotenv.config();

const API_HOST = "imdb236.p.rapidapi.com";
const API_KEY = process.env.API_KEY;

const con = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const app = express();
app.use(cors());
app.use(express.json());

// Fetch popular movies from the API
async function fetchPopularMovies() {
  const options = {
    method: "GET",
    url: "https://imdb236.p.rapidapi.com/imdb/most-popular-movies",
    headers: {
      "x-rapidapi-key": API_KEY,
      "x-rapidapi-host": API_HOST,
    },
  };

  try {
    const response = await axios.request(options);
    const movies = response.data || []; // Ensure response.data is an array
    if (!Array.isArray(movies) || movies.length === 0) {
      console.log("No movies found in API response.");
      return;
    }

    for (const movie of movies) {
      await saveMovie(movie);
    }

    console.log("Movies and genres saved successfully!");
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

// Save movie data to the database
async function saveMovie(movie) {
  const { id, primaryTitle, description, primaryImage, averageRating, numVotes, genres } = movie;

  try {
    // **Check if the movie already exists**
    const [existingMovie] = await con.query(
      `SELECT id FROM movies WHERE movie_id = ?`, 
      [id]
    );

    let mov_id;
    if (existingMovie.length === 0) {
      // **Insert the movie if it doesn't exist**
      const [movieResult] = await con.query(
        `INSERT INTO movies (movie_id, title, description, poster, average_rating, num_votes)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [id, primaryTitle, description, primaryImage, averageRating, numVotes]
      );
      mov_id = movieResult.insertId;
      console.log(`Inserted new movie: ${primaryTitle}`);
    } else {
      console.log(`Movie already exists: ${primaryTitle}`);
      mov_id = existingMovie[0].id;
    }

    // **Insert genres and link them to movies**
    for (const genre of genres) {
      // **Check if the genre exists**
      const [existingGenre] = await con.query(
        `SELECT id FROM genres WHERE name = ?`, 
        [genre]
      );

      let genreId;
      if (existingGenre.length === 0) {
        // **Insert the genre if it doesn't exist**
        const [genreResult] = await con.query(
          `INSERT INTO genres (name) VALUES (?)`, 
          [genre]
        );
        genreId = genreResult.insertId;
      } else {
        genreId = existingGenre[0].id;
      }

      // **Check if the movie-genre relationship already exists**
      const [existingMovieGenre] = await con.query(
        `SELECT 1 FROM movie_genres WHERE movie_id = ? AND genre_id = ?`,
        [mov_id, genreId]
      );

      if (existingMovieGenre.length === 0) {
        // **Insert the movie-genre relationship if it doesn't exist**
        await con.query(
          `INSERT INTO movie_genres (movie_id, genre_id) VALUES (?, ?)`,
          [mov_id, genreId]
        );
      }
    }
  } catch (error) {
    console.error("Error saving movie:", error);
  }
}

// Run the script
fetchPopularMovies();

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
