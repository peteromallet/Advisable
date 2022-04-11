import React from "react";
import { Routes, Route } from "react-router-dom";
import FeedSidebar from "./FeedSidebar";
import Interest from "./Interest";
import MainFeed from "./MainFeed";

export default function Feed() {
  return (
    <div className="flex">
      <FeedSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-[860px] mx-auto">
          <Routes>
            <Route index element={<MainFeed />} />
            <Route path=":interest" element={<Interest />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
