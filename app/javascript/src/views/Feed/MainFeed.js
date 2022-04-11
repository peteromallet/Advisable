import React, { useCallback } from "react";
import { useFeed } from "./queries";
import FeedItem from "./components/FeedItem";
import EndlessScroll from "./components/EndlessScroll";

export default function MainFeed() {
  const { data, loading, error, fetchMore } = useFeed();

  const handleLoadMore = useCallback(() => {
    if (!data) return;
    if (!data.feed.pageInfo.hasNextPage) return;
    fetchMore({ variables: { cursor: data.feed.pageInfo.endCursor } });
  }, [fetchMore, data]);

  if (loading) return null;

  const edges = data?.feed?.edges || [];
  const results = edges.map((n) => n.node);

  return (
    <div className="divide-y divide-solid divide-neutral200">
      <h2 className="text-3xl font-semibold tracking-tight mb-5">Feed</h2>
      {results.map((result) => (
        <FeedItem key={result.id} article={result.article} />
      ))}
      <EndlessScroll onLoadMore={handleLoadMore} />
    </div>
  );
}
