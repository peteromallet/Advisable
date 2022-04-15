import React from "react";
import { Routes, Route } from "react-router-dom";
import FeedSidebar from "./components/FeedSidebar";
import Interest from "./Interest";
import MainFeed from "./MainFeed";
import { ErrorBoundary } from "react-error-boundary";
import { useBackground } from "src/../../../donut/src";

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

  return (
    <div className="flex">
      <FeedSidebar />
      <div className="flex-1 p-8">
        <ErrorBoundary FallbackComponent={FeedViewFailed}>
          <Routes>
            <Route index element={<MainFeed />} />
            <Route path=":interest" element={<Interest />} />
          </Routes>
        </ErrorBoundary>
      </div>
    </div>
  );
}
