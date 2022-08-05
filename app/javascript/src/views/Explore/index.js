import React from "react";
import Footer from "src/components/Footer";
import TopicsBar from "./TopicsBar";
import "./explore.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Feed from "./Feed";
import Trending from "./Trending";
import Favorites from "./Favorites";
import ScrollToTop from "./ScrollToTop";
import Topic from "./Topic";
import useTutorial from "src/hooks/useTutorial";

export default function Explore() {
  const location = useLocation();
  const onboarding = useTutorial("onboarding");

  if (!onboarding.isComplete) {
    return <Navigate replace to="/setup/company" />;
  }

  return (
    <>
      <div className="max-w-[1300px] mx-auto px-5 lg:px-10 pb-10 min-h-[80vh]">
        <ScrollToTop />
        <TopicsBar />
        <div className="h-px bg-neutral-200" />
        <Routes location={location.state?.backgroundLocation || location}>
          <Route index element={<Feed />} />
          <Route path="trending" element={<Trending />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path=":slug" element={<Topic />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
