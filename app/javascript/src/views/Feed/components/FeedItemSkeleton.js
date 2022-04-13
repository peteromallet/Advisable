import React from "react";

export default function FeedItemSkeleton() {
  return (
    <div className="py-11">
      <div className="w-full h-6 rounded-lg bg-neutral100 mb-3" />
      <div className="w-2/3 h-6 rounded-lg bg-neutral100 mb-5" />
      <div className="space-y-3">
        <div className="w-full h-2 rounded-lg bg-neutral100" />
        <div className="w-full h-2 rounded-lg bg-neutral100" />
        <div className="w-1/2 h-2 rounded-lg bg-neutral100" />
      </div>
    </div>
  );
}
