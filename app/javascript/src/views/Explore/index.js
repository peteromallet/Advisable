import React from "react";
import Footer from "src/components/Footer";
import TopicsBar from "./TopicsBar";
import "./explore.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Feed from "./Feed";
import Trending from "./Trending";
import Favorites from "./Favorites";

export default function Explore() {
  const location = useLocation();

  return (
    <>
      <div className="max-w-[1300px] mx-auto px-5 pb-10">
        <TopicsBar />
        <div className="h-px mb-8 bg-neutral-200" />
        <Routes location={location.state?.backgroundLocation || location}>
          <Route index element={<Feed />} />
          <Route path="trending" element={<Trending />} />
          <Route path="favorites" element={<Favorites />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
