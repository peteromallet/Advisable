import React, { useCallback } from "react";
import EndlessScroll from "./EndlessScroll";
import { useFeed } from "./queries";
import "./explore.css";
import CaseStudyGrid from "./CaseStudyGrid";

const PAGE_SIZE = 15;

export default function Explore() {
  const { loading, data, fetchMore } = useFeed();
  const pageInfo = data?.feed?.pageInfo;
  const edges = data?.feed?.edges || [];
  const results = edges.map((n) => n.node.article);

  const handleLoadMore = useCallback(() => {
    if (!data) return;
    if (!data.feed.pageInfo.hasNextPage) return;
    fetchMore({ variables: { cursor: data.feed.pageInfo.endCursor } });
  }, [fetchMore, data]);

  return (
    <>
      <div className="mb-8">
        <h1 className="mb-1 text-4xl font-bold tracking-tight text-neutral900">
          Your Feed
        </h1>
        <p className="text-lg text-neutral-500">
          The best projects based on your interests.
        </p>
      </div>
      <CaseStudyGrid loading={loading} results={results} />
      {pageInfo?.hasNextPage && <EndlessScroll onLoadMore={handleLoadMore} />}
    </>
  );
}
