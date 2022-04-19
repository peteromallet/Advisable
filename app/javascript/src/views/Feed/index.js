import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import FeedSidebar from "./components/FeedSidebar";
import Interest from "./Interest";
import MainFeed from "./MainFeed";
import { ErrorBoundary } from "react-error-boundary";
import { useBackground } from "src/../../../donut/src";
import BottomBar from "./components/BottomBar";
import useTutorial from "src/hooks/useTutorial";

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
    return <Navigate to="/setup" />;
  }

  return (
    <div className="flex">
      <FeedSidebar />
      <BottomBar />
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
