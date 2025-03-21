import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the API key and base URL
const API_KEY = "7ffceb24"; // Replace with your API key
const API_URL = "http://www.omdbapi.com/";

interface Movie {
  Title: string;
  Year: string;
  Poster: string; // We'll be using this to display the poster image
}

const EightiesMovieList: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]); // State to store fetched movies
  const [error, setError] = useState<string>(""); // Error state for API failures
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Function to fetch movies (change the search term as needed)
  const fetchMovies = async (searchTerm: string) => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, {
        params: {
          s: searchTerm, // Search term (e.g., '80s movies')
          apikey: API_KEY,
        },
      });

      // Check if response is successful and contains Search results
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setError("No movies found.");
      }
    } catch (err) {
      setError("Failed to fetch movies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies("80s movies"); // Default search term to fetch 80s movies
  }, []); // Empty array ensures this only runs once when the component mounts

  return (
    <div className="movie-list">
      <h2>Movie List</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <div className="movie-posters">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <div key={index} className="movie-item">
              <img src={movie.Poster} alt={movie.Title} />
              <h3>{movie.Title} ({movie.Year})</h3>
            </div>
          ))
        ) : (
          <p>No movies available.</p>
        )}
      </div>
    </div>
  );
};

export default EightiesMovieList;
