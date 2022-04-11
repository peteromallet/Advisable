import React from "react";
import FeedSidebar from "./FeedSidebar";
import MainFeed from "./MainFeed";

export default function Feed() {
  return (
    <div className="flex">
      <FeedSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-[860px] mx-auto">
          <MainFeed />
        </div>
      </div>
    </div>
  );
}
