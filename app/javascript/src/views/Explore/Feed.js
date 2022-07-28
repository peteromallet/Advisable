import React, { useCallback } from "react";
import EndlessScroll from "./EndlessScroll";
import { useFeed } from "./queries";
import "./explore.css";
import CaseStudyGrid from "./CaseStudyGrid";
import ExploreViewHeading from "./ExploreViewHeading";

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
        <ExploreViewHeading title="Your Feed" description="The best projects based on your interests." />
      <CaseStudyGrid loading={loading} results={results} />
      {pageInfo?.hasNextPage && <EndlessScroll onLoadMore={handleLoadMore} />}
    </>
  );
}
