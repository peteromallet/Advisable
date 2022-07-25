import React, { useCallback } from "react";
import { useSearch } from "./queries";
import CaseStudyGrid from "../Explore/CaseStudyGrid";
import ScrollToTop from "../Explore/ScrollToTop";
import Footer from "src/components/Footer";
import EndlessScroll from "../Explore/EndlessScroll";

export default function Search() {
  const { data, loading, fetchMore } = useSearch();

  const edges = data?.search?.articles?.edges || [];
  const pageInfo = data?.search?.articles?.pageInfo || {};
  const results = edges.map((e) => e.node);

  const handleLoadMore = useCallback(() => {
    fetchMore({
      variables: {
        cursor: data?.search?.articles?.pageInfo?.endCursor,
      },
    });
  }, [fetchMore, data]);

  return (
    <>
      <div className="max-w-[1300px] mx-auto px-5 pb-10">
        <ScrollToTop />
        <div className="py-8">
          <CaseStudyGrid loading={loading} results={results} />
          {pageInfo.hasNextPage && (
            <EndlessScroll onLoadMore={handleLoadMore} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
