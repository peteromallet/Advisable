import React, { useCallback } from "react";
import EndlessScroll from "./EndlessScroll";
import { useFeed } from "./queries";
import "./explore.css";
import CaseStudyGrid from "./CaseStudyGrid";
import ExploreViewHeading from "./ExploreViewHeading";
import CustomizeInterests from "./CustomizeInterests";
import useFeedUpdate from "./hooks/useFeedUpdate";

export default function Explore() {
  const { loading, data, fetchMore } = useFeed();
  const { pendingRefresh, awaitFeedUpate, refreshFeed } = useFeedUpdate();

  const pageInfo = data?.feed?.pageInfo;
  const edges = data?.feed?.edges || [];
  const results = pendingRefresh ? [] : edges.map((n) => n.node.article);
  const isLoading = loading || pendingRefresh;

  const handleLoadMore = useCallback(() => {
    if (!data) return;
    if (!data.feed.pageInfo.hasNextPage) return;
    fetchMore({ variables: { cursor: data.feed.pageInfo.endCursor } });
  }, [fetchMore, data]);

  return (
    <>
      <ExploreViewHeading title="Your Feed" description="The best projects based on your interests.">
        <CustomizeInterests awaitFeedUpdate={awaitFeedUpate} refreshFeed={refreshFeed} interests={data?.interests} />
      </ExploreViewHeading>
      <CaseStudyGrid loading={isLoading} results={results} />
      {pageInfo?.hasNextPage && <EndlessScroll onLoadMore={handleLoadMore} />}
    </>
  );
}
