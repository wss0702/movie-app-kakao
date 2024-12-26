import React, { useState, useEffect } from "react";
import { BaseService } from "../../../client"; // API 요청 서비스
import "./Search.css";

const Search = () => {
  const [searchInput, setSearchInput] = useState(""); // 검색어
  const [searchResults, setSearchResults] = useState([]); // API 결과 저장
  const [filteredResults, setFilteredResults] = useState([]); // 필터링된 결과
  const [genres, setGenres] = useState([]); // 장르 리스트
  const [selectedGenre, setSelectedGenre] = useState(""); // 선택된 장르
  const [minRating, setMinRating] = useState(0); // 최소 평점
  const [sortOption, setSortOption] = useState(""); // 정렬 옵션
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // 로딩 상태

  // 장르 데이터 가져오기
  const fetchGenres = async () => {
    try {
      const response = await BaseService.RetrieveApiData(
        "/genre/movie/list",
        "GET"
      );
      setGenres(response.genres);
    } catch (err) {
      console.error("장르 데이터를 불러오는 중 오류 발생:", err);
    }
  };

  // 검색 결과 가져오기
  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await BaseService.RetrieveApiData(
        `/search/movie?query=${encodeURIComponent(searchInput)}`,
        "GET"
      );
      setSearchResults(response.results);
      setFilteredResults(response.results); // 필터링 초기값
    } catch (err) {
      setError("영화를 검색하는 중 오류가 발생했습니다.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 검색 실행
  const handleSearch = () => {
    if (!searchInput.trim()) return;
    fetchMovies();
  };

  // 필터링 적용
  const applyFilters = () => {
    let results = [...searchResults];

    // 장르 필터
    if (selectedGenre) {
      results = results.filter((movie) =>
        movie.genre_ids.includes(parseInt(selectedGenre))
      );
    }

    // 평점 필터
    results = results.filter((movie) => movie.vote_average >= minRating);

    // 정렬 옵션
    if (sortOption === "popularity") {
      results = results.sort((a, b) => b.popularity - a.popularity);
    } else if (sortOption === "release_date") {
      results = results.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
    }

    setFilteredResults(results); // 필터링된 결과 저장
  };

  // 필터 초기화
  const resetFilters = () => {
    setSelectedGenre("");
    setMinRating(0);
    setSortOption("");
    setFilteredResults(searchResults); // 원본 데이터로 초기화
  };

  // 장르 데이터 로드
  useEffect(() => {
    fetchGenres();
  }, []);

  // 이미지 URL 처리 함수
  const getImageUrl = (path) =>
    path ? `https://image.tmdb.org/t/p/w500${path}` : "/placeholder-image.jpg";

  return (
    <div className="container-search">
      <h2>Search</h2>

      {/* 검색 및 필터 영역 */}
      <div className="container-search-bar">
        <div className="input-container">
          <input
            type="text"
            className="content-search"
            placeholder="검색어를 입력하세요"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <button className="search-button" onClick={handleSearch}>
          검색
        </button>

        {/* 필터 옵션 */}
        <div className="filter-container">
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">장르 선택</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            min="0"
            max="10"
            step="0.5"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            placeholder="최소 평점"
          />

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">정렬 선택</option>
            <option value="popularity">인기순</option>
            <option value="release_date">개봉일순</option>
          </select>

          <button onClick={applyFilters}>필터 적용</button>
          <button onClick={resetFilters}>초기화</button>
        </div>
      </div>

      {/* 로딩 상태 */}
      {loading && <p className="loading">검색 중...</p>}

      {/* 오류 메시지 */}
      {error && <p className="error-message">{error}</p>}

      {/* 검색 결과 */}
      <div className="search-results">
        {filteredResults.length > 0 ? (
          filteredResults.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                className="movie-poster"
                src={getImageUrl(movie.poster_path)}
                alt={movie.title || "영화 이미지"}
              />
              <h3>{movie.title || movie.name}</h3>
              <p>평점: {movie.vote_average || "N/A"}</p>
            </div>
          ))
        ) : (
          !loading && <p>검색 결과가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
