// App.js

import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header/Header';


import WishlistPage from './components/pages/wishlist/Wishlist';
import PopularPage from './components/pages/popular/Popular';
import HomeMain from './components/pages/main/HomeMain';
import Login from './components/pages/signin/Login';
import SearchPage from './components/pages/search/Search';
import { ToastContainer } from 'react-toastify';
import OAuthRedirectHandler from "./components/pages/oauth/OAuthRedirectHandler";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<><Header /><HomeMain /></>} />
        <Route path="/wishlist" element={<><Header /><WishlistPage /></>} />
        <Route path="/popular" element={<><Header /><PopularPage /></>} />
        <Route path="/search" element={<><Header /><SearchPage /></>} />
        <Route path="/signin" element={<Login />} />
        <Route path="/oauth" element={<OAuthRedirectHandler />} /> {/* 추가된 라우트 */}
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
