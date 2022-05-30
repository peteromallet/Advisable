import React from "react";
import { useBackground } from "@advisable/donut";
import { Routes, Route, Navigate } from "react-router-dom";
import FeedSidebar from "./components/FeedSidebar";
import Interest from "./Interest";
import MainFeed from "./MainFeed";
import { ErrorBoundary } from "react-error-boundary";
import BottomBar from "./components/BottomBar";
import useTutorial from "src/hooks/useTutorial";
import Bookmarks from "./Bookmarks";
import Search from "./Search";
import "./feed.css";
import Footer from "src/components/Footer";

function FeedViewFailed() {
  return (
    <div className="grid place-items-center">
      <h5 className="font-semibold">Fail to load</h5>
      <p>Please try refreshing the page</p>
    </div>
  );
}

export default function Feed() {
  useBackground("beige");
  const onboarding = useTutorial("onboarding");

  if (!onboarding.isComplete) {
    return <Navigate replace to="/setup/company" />;
  }

  return (
    <div className="flex">
      <FeedSidebar />
      <BottomBar />
      <div className="flex-1 w-full flex flex-col">
        <div className="flex-1 w-full">
          <ErrorBoundary FallbackComponent={FeedViewFailed}>
            <Routes>
              <Route index element={<MainFeed />} />
              <Route path="search" element={<Search />} />
              <Route path=":interest" element={<Interest />} />
              <Route path="bookmarks" element={<Bookmarks />} />
            </Routes>
          </ErrorBoundary>
        </div>
        <Footer />
      </div>
    </div>
  );
}
