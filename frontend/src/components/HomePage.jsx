import React from "react";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaFilm, FaUsers } from "react-icons/fa";
import "../styles/global.scss";
import MovieCard from "../styles/moviecard";
export default function HomePage() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularUsers, setPopularUsers] = useState([]);

  useEffect(() => {
    // Fetch mock data for now (replace with API call later)
    setPopularMovies([
      { id: 1, title: "Inception", poster: "https://via.placeholder.com/100" },
      { id: 2, title: "Interstellar", poster: "https://via.placeholder.com/100" },
      { id: 3, title: "The Dark Knight", poster: "https://via.placeholder.com/100" },
    ]);
    setPopularUsers([
      { id: 1, name: "John Doe", avatar: "https://via.placeholder.com/50" },
      { id: 2, name: "Jane Smith", avatar: "https://via.placeholder.com/50" },
    ]);
  }, []);

  return (
    <div className="homepage">
      {/* Navbar */}
      <nav className="navbar">
        <h1>Movie App</h1>
        <div className="nav-links">
          <a href="#">Search Movies</a>
          <a href="#">Communities</a>
          <a href="#">Login</a>
        </div>
      </nav>

      {/* Welcome Section */}
      <header className="welcome">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          Welcome to Movie World
        </motion.h1>
        <FaFilm className="background-icon" />
      </header>

      <div className="content">
        {/* Left Sidebar (Popular Movies) */}
        <aside className="sidebar">
          <h2>Popular Movies</h2>
          <div className="movies-list">
            {popularMovies.map((movie) => (
              <div key={movie.id} className="movie">
                <img src={movie.poster} alt={movie.title} />
                <p>{movie.title}</p>
              </div>
            ))}
          </div>
        </aside>
  <MovieCard movie={{
  title: "Inception",
  poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  average_rating: 8.8,
  num_votes: 2000000,
  genres: ["Action", "Sci-Fi", "Thriller"],
  description: "A mind-bending thriller about dreams within dreams.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
}} />

        {/* Main Content (Popular Users) */}
        <main className="main-content">
          <h2>Popular Users</h2>
          <div className="users-list">
            {popularUsers.map((user) => (
              <div key={user.id} className="user">
                <img src={user.avatar} alt={user.name} />
                <p>{user.name}</p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
