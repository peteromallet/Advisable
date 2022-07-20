import React, { useCallback } from "react";
import EndlessScroll from "./EndlessScroll";
import { useFavorites } from "./queries";
import "./explore.css";
import CaseStudyGrid from "./CaseStudyGrid";

const PAGE_SIZE = 15;

export default function Favorites() {
  const { loading, data, fetchMore } = useFavorites();
  const pageInfo = data?.favoritedArticles?.pageInfo;
  const edges = data?.favoritedArticles?.edges || [];
  const results = edges.map((n) => n.node);

  const handleLoadMore = useCallback(() => {
    if (!data) return;
    if (!data.favoritedArticles.pageInfo.hasNextPage) return;
    fetchMore({
      variables: { cursor: data.favoritedArticles.pageInfo.endCursor },
    });
  }, [fetchMore, data]);

  return (
    <>
      <div className="mb-8">
        <h1 className="mb-1 text-4xl font-bold tracking-tight text-neutral900">
          Your Favorites
        </h1>
      </div>
      <CaseStudyGrid loading={loading} results={results} />
      {pageInfo?.hasNextPage && <EndlessScroll onLoadMore={handleLoadMore} />}
    </>
  );
}
