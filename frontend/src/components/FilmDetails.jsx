import React from "react";

const FilmDetails = ({ film }) => {
  if (!film) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      {/* Movie Poster and Title */}
      <div className="flex flex-col md:flex-row items-center">
        <img
          src={film.primaryImage}
          alt={film.primaryTitle}
          className="w-64 h-auto rounded-lg shadow-md"
        />
        <div className="md:ml-6 text-center md:text-left">
          <h1 className="text-3xl font-bold">{film.primaryTitle}</h1>
          <p className="text-gray-400 italic">{film.originalTitle}</p>
          <p className="mt-2">{film.description}</p>
          <p className="mt-2 text-yellow-400">Rating: {film.averageRating} ⭐</p>
        </div>
      </div>

      {/* Movie Details */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p><strong>Release Date:</strong> {film.releaseDate}</p>
          <p><strong>Runtime:</strong> {film.runtimeMinutes} min</p>
          <p><strong>Genre:</strong> {film.genres.join(", ")}</p>
          <p><strong>Content Rating:</strong> {film.contentRating || "N/A"}</p>
        </div>
        <div>
          <p><strong>Budget:</strong> ${film.budget.toLocaleString()}</p>
          <p><strong>Worldwide Gross:</strong> ${film.grossWorldwide.toLocaleString()}</p>
          <p><strong>Languages:</strong> {film.spokenLanguages.join(", ")}</p>
          <p><strong>Filming Locations:</strong> {film.filmingLocations.join(", ")}</p>
        </div>
      </div>

      {/* Interests */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Themes & Interests</h3>
        <div className="flex flex-wrap mt-2">
          {film.interests.map((interest, index) => (
            <span key={index} className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm mr-2 mb-2">
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Production Companies */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Production Companies</h3>
        <ul className="list-disc pl-5 text-gray-400">
          {film.productionCompanies.map((company) => (
            <li key={company.id}>{company.name}</li>
          ))}
        </ul>
      </div>

      {/* IMDb Link */}
      <div className="mt-6 text-center">
        <a
          href={film.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-500"
        >
          View on IMDb
        </a>
      </div>
    </div>
  );
};

export default FilmDetails;
