// src/pages/popular/Popular.jsx
import React, { useState, useEffect } from "react";
import { BaseService } from "../../../client"; // API 서비스
import "./Popular.css";

const Popular = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1); // 현재 페이지 (Grid View에서 사용)
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'table'
  const moviesPerPage = 12; // Grid View에서 한 페이지에 표시할 영화 수

  useEffect(() => {
    // Fetch popular movies
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await BaseService.RetrieveApiData(`/movie/popular?page=${page}`, "GET");
        if (viewMode === "table") {
          setMovies((prevMovies) => [...prevMovies, ...response.results]); // 무한 스크롤
        } else {
          setMovies(response.results); // 페이지 단위 로드
        }
      } catch (error) {
        console.error("Failed to fetch popular movies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [page, viewMode]);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50 &&
      !isLoading &&
      viewMode === "table"
    ) {
      setPage((prevPage) => prevPage + 1); // 무한 스크롤로 다음 페이지 로드
    }
  };

  useEffect(() => {
    if (viewMode === "table") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [viewMode, isLoading]);

  // Grid View에서 페이지 변경 핸들러
  const handlePageChange = (direction) => {
    if (direction === "prev" && page > 1) {
      setPage((prevPage) => prevPage - 1);
    } else if (direction === "next") {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className="popular-page">
      <h1>Popular Movies</h1>
      <div className="view-mode-toggle">
        <button
          onClick={() => {
            setViewMode("grid");
            setPage(1); // Grid View 전환 시 첫 페이지로 설정
          }}
          className={viewMode === "grid" ? "active" : ""}
        >
          Grid View
        </button>
        <button
          onClick={() => {
            setViewMode("table");
            setPage(1); // Table View 전환 시 첫 페이지로 설정
          }}
          className={viewMode === "table" ? "active" : ""}
        >
          Table View
        </button>
      </div>

      {viewMode === "table" ? (
        <table className="movie-table">
          <thead>
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Release Date</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td>
                  <img
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster"
                  />
                </td>
                <td>{movie.title}</td>
                <td>{movie.release_date}</td>
                <td>{movie.vote_average}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <div className="movie-grid">
            {movies.map((movie) => (
              <div className="movie-card" key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() => handlePageChange("prev")}
              disabled={page === 1}
              className="pagination-button"
            >
              Previous
            </button>
            <span className="pagination-info">Page {page}</span>
            <button
              onClick={() => handlePageChange("next")}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </>
      )}

      {isLoading && <div className="loading-message">Loading...</div>}
    </div>
  );
};

export default Popular;
