import React, { useCallback } from "react";
import { motion } from "framer-motion";
import EndlessScroll from "./EndlessScroll";
import { useFavorites } from "./queries";
import "./explore.css";
import CaseStudyGrid from "./CaseStudyGrid";
import ArchiveIllustration from "src/illustrations/zest/archive";
import ExploreViewHeading from "./ExploreViewHeading";

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

  const isEmpty = !loading && results.length === 0;

  return (
    <>
      {!isEmpty && (
        <ExploreViewHeading title="Your Favorites" description="Your favorite projects" loading={loading} />
      )}
      <CaseStudyGrid loading={loading} results={results} />
      {pageInfo?.hasNextPage && <EndlessScroll onLoadMore={handleLoadMore} />}

      {isEmpty && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-16 text-center">
          <ArchiveIllustration
            primaryColor="var(--color-neutral-800)"
            secondaryColor="var(--color-blue-200)"
            width="200px" className="mx-auto mb-8" />
          <h5 className="font-medium text-lg">No favourites</h5>
          <p>You haven't favorited any projecs yet.</p>
        </motion.div>
      )}
    </>
  );
}
