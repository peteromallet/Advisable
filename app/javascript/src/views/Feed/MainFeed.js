import React from "react";
import { useFeed } from "./queries";
import FeedItem from "./components/FeedItem";

export default function MainFeed() {
  const { data, loading, error } = useFeed();

  if (loading) return null;

  const edges = data?.feed?.edges || [];
  const results = edges.map((n) => n.node);

  return (
    <div className="divide-y divide-solid divide-neutral200">
      <h2 className="text-3xl font-semibold tracking-tight mb-5">Feed</h2>
      {results.map((result) => (
        <FeedItem key={result.id} article={result.article} />
      ))}
    </div>
  );
}
