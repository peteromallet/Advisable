import React from "react";
import { Routes, Route } from "react-router-dom";
import FeedSidebar from "./FeedSidebar";
import Interest from "./Interest";
import MainFeed from "./MainFeed";
import Article from "./Article";
import { ErrorBoundary } from "react-error-boundary";

function FeedViewFailed() {
  return (
    <div className="grid place-items-center">
      <h5 className="font-semibold">Fail to load</h5>
      <p>Please try refreshing the page</p>
    </div>
  );
}

export default function Feed() {
  return (
    <div className="flex">
      <FeedSidebar />
      <div className="flex-1 p-8">
        <ErrorBoundary FallbackComponent={FeedViewFailed}>
          <div className="max-w-[800px] mx-auto">
            <Routes>
              <Route index element={<MainFeed />} />
              <Route path="articles/:slug" element={<Article />} />
              <Route path=":interest" element={<Interest />} />
            </Routes>
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
}
