import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="home-page-container">
      {/* Welcome message */}
      <h1>Welcome to Retro Reel!</h1>
      <p>Discover the best films from the 80s and 90s.</p>

      <div className="button-container">
        {/* Button for 80s Films */}
        <Link to="/films/80s">
          <button className="film-button film-80s">Explore 80s Films</button>
        </Link>

        {/* Button for 90s Films */}
        <Link to="/films/90s">
          <button className="film-button film-90s">Explore 90s Films</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
