// src/components/main/Banner.jsx
import React, { useState, useEffect } from "react";
import { BaseService } from "../../../../client"; // API 호출을 위한 서비스
import "./Banner.css";

import { useWishlist } from "../../../../hooks/useWishlist";

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const { addToWishlist } = useWishlist()
  useEffect(() => {
    const fetchBannerMovie = async () => {
      try {
        // TMDB API에서 현재 상영 중인 영화 중 하나를 가져옴
        const response = await BaseService.RetrieveApiData("/movie/now_playing", "GET");
        const movies = response?.results;

        if (movies && movies.length > 0) {
          // 랜덤으로 영화 선택
          const randomIndex = Math.floor(Math.random() * movies.length);
          setMovie(movies[randomIndex]);
        }
      } catch (error) {
        console.error("Failed to fetch banner movie:", error);
      }
    };

    fetchBannerMovie();
  }, []);

  // 긴 설명 텍스트를 줄이는 함수
  const truncate = (str, length) => {
    return str?.length > length ? str.substring(0, length - 1) + "..." : str;
  };
  // 영화 데이터가 로드되지 않았다면 로딩 메시지 출력
  if (!movie) {
    return <div className="banner-loading">Loading...</div>;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-contents">
        <h1 className="banner-title">{movie.title || movie.name || "Movie Title"}</h1>
        <p className="banner-description">{truncate(movie.overview, 150)}</p>
        <div className="banner-buttons">
          <button
            className="banner-button"
            onClick={() => addToWishlist(movie)}
          >
            My List
          </button>
        </div>
      </div>
      <div className="banner-fadeBottom" />
    </header>
  );
};

export default Banner;
