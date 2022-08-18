/* eslint-disable no-unused-vars */
import React, { useCallback } from "react";
import EndlessScroll from "./EndlessScroll";
import { useHome } from "./queries";
import CaseStudyGrid from "./CaseStudyGrid";

export default function Home() {
  const { loading, data, fetchMore } = useHome();

  const pageInfo = data?.topic?.articles?.pageInfo;
  const edges = data?.topic?.articles?.edges || [];
  const results = edges.map((n) => n.node);

  const handleLoadMore = useCallback(() => {
    if (!data) return;
    if (!data.feed.pageInfo.hasNextPage) return;
    fetchMore({ variables: { cursor: data.feed.pageInfo.endCursor } });
  }, [fetchMore, data]);

  return (
    <div className="py-12">
      <CaseStudyGrid loading={loading} results={results} />
      {pageInfo?.hasNextPage && <EndlessScroll onLoadMore={handleLoadMore} />}
    </div>
  );
}
