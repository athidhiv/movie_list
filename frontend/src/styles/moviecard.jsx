import React, { useState } from "react";
const MovieCard = ({ movie }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative w-60 h-80 overflow-hidden rounded-2xl shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Movie Poster */}
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-full object-cover"
      />

      {/* Rating & Votes */}
      <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-md text-sm">
        ⭐ {movie.average_rating} ({movie.num_votes} votes)
      </div>

      {/* Hover Content */}
      {hover && (
        <div className="absolute inset-0 bg-black bg-opacity-80 text-white flex flex-col p-4">
          <h3 className="text-lg font-bold mb-2">{movie.title}</h3>
          <p className="text-xs italic">{movie.genres.join(", ")}</p>
          <div className="mt-2 overflow-y-auto max-h-40 text-sm scrollbar-thin scrollbar-thumb-gray-500">
            {movie.description}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
