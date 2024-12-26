// src/components/main/Row.jsx
import React, { useState, useEffect } from "react";
import { BaseService } from "../../../../client"; // API 호출 서비스
import "./Row.css";

import { useWishlist } from "../../../../hooks/useWishlist";

const Row = ({ title, fetchUrl, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  const { addToWishlist } = useWishlist()

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await BaseService.RetrieveApiData(fetchUrl, "GET");
        const results = response?.results || [];
        setMovies(results);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, [fetchUrl]);

  const handleScrollLeft = () => {
    document.querySelector(`#row-${title}`).scrollBy({
      left: -500,
      behavior: "smooth",
    });
  };

  const handleScrollRight = () => {
    document.querySelector(`#row-${title}`).scrollBy({
      left: 500,
      behavior: "smooth",
    });
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="slider">
        <div
          className="slider__arrow-left"
          onClick={handleScrollLeft}
          role="button"
        >
          <span className="arrow">◀</span>
        </div>
        <div className="row__posters" id={`row-${title}`}>
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`row__poster ${
                isLargeRow ? "row__posterLarge" : ""
              }`}
              src={`https://image.tmdb.org/t/p/w500${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.title || movie.name}
              
              onClick={() => addToWishlist(movie)}
            />
          ))}
        </div>
        <div
          className="slider__arrow-right"
          onClick={handleScrollRight}
          role="button"
        >
          <span className="arrow">▶</span>
        </div>
      </div>
    </div>
  );
};

export default Row;
