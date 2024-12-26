// HomeMain.jsx

import React, { useState, useEffect } from 'react';
import './HomeMain.css';
import Banner from './Banner/Banner';
import Row from './MovieRow/Row';

function HomeMain() {

  return (
    <div className="home">
     <Banner />
      <Row title="Trending Now" fetchUrl="/trending/all/week" />
      <Row title="Top Rated" fetchUrl="/movie/top_rated" />
      <Row title="Action Movies" fetchUrl="/discover/movie?with_genres=28" />
      <Row title="Comedy Movies" fetchUrl="/discover/movie?with_genres=35" />
      <Row title="Horror Movies" fetchUrl="/discover/movie?with_genres=27" />
      <Row title="Romance Movies" fetchUrl="/discover/movie?with_genres=10749" />
      <Row title="Documentaries" fetchUrl="/discover/movie?with_genres=99" />

    </div>
  );
}

export default HomeMain;
