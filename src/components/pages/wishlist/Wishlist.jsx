// src/pages/wishlist/Wishlist.jsx
import React, { useState, useEffect } from "react";
import "./Wishlist.css";

import { useWishlist } from "../../../hooks/useWishlist";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, isWishListLoading } = useWishlist()


  // 찜 목록이 비어있는 경우 처리
  if (isWishListLoading) {
    return (
      <div className="wishlist-page">
        <h1>My Wishlist</h1>
        <p className="empty-message">Your wishlist is empty.</p>
      </div>
    );
  }

  console.log(wishlist)

  return (
    <div className="wishlist-page">
      <h1>My Wishlist</h1>
      <div className="wishlist-grid">
        {wishlist?.map((movie) => (
          <div key={movie.id} className="wishlist-card">
            <img
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              alt={movie.title}
              className="wishlist-poster"
            />
            <div className="wishlist-info">
              <h3>{movie.title}</h3>
              <button
                className="remove-button"
                onClick={() => removeFromWishlist(movie)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
