import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useInterest } from "./queries";
import FeedItem from "./components/FeedItem";
import EndlessScroll from "./components/EndlessScroll";

export default function Interest() {
  const { interest: id } = useParams();
  const { data, loading, error, fetchMore } = useInterest({
    variables: { id },
  });

  const handleLoadMore = useCallback(() => {
    if (!data) return;
    if (!data.feed.pageInfo.hasNextPage) return;
    fetchMore({ variables: { cursor: data.feed.pageInfo.endCursor } });
  }, [fetchMore, data]);

  if (loading) return <>loading...</>;
  const results = data.interest.articles.edges.map((e) => e.node);

  return (
    <div className="divide-y divide-solid divide-neutral200">
      <h2 className="text-3xl font-semibold tracking-tight mb-5">
        {data.interest.term}
      </h2>
      {results.map((result) => (
        <FeedItem key={result.id} article={result} />
      ))}
      <EndlessScroll onLoadMore={handleLoadMore} />
    </div>
  );
}
