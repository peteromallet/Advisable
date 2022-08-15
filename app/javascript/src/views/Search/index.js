import React, { useCallback } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import { useSearch } from "./queries";
import CaseStudyGrid from "../Explore/CaseStudyGrid";
import ScrollToTop from "../Explore/ScrollToTop";
import Footer from "src/components/Footer";
import EndlessScroll from "../Explore/EndlessScroll";
import ExploreViewHeading from "../Explore/ExploreViewHeading";
import FeedFooter from "../Explore/FeedFooter";
import SearchIllustration from "src/illustrations/zest/search";

export default function Search() {
  const location = useLocation();
  const { search } = location?.state?.backgroundLocation || location;
  const term = queryString.parse(search).q;
  const { data, loading, fetchMore } = useSearch(term);

  const edges = data?.search?.articles?.edges || [];
  const pageInfo = data?.search?.articles?.pageInfo || {};
  const results = edges.map((e) => e.node);
  const hasResults = results.length > 0;

  const handleLoadMore = useCallback(() => {
    fetchMore({
      variables: {
        cursor: data?.search?.articles?.pageInfo?.endCursor,
      },
    });
  }, [fetchMore, data]);

  return (
    <>
      <div className="max-w-[1300px] mx-auto px-5 py-6 pb-10">
        <ScrollToTop />
        <ExploreViewHeading
          back="/" title={term} description={`Discover the best "${term}" projects`} />
        <CaseStudyGrid loading={loading} results={results} />
        {pageInfo.hasNextPage && (
          <EndlessScroll onLoadMore={handleLoadMore} />
        )}
        {!loading && hasResults && !pageInfo.hasNextPage && (
          <FeedFooter>
            You've reached the end of the list.
          </FeedFooter>
        )}

        {!loading && !hasResults && (
          <div className="w-[300px] py-12 mx-auto text-center">
            <SearchIllustration width="200px" className="mx-auto mb-8" />
            <h4 className="font-semibold">No results</h4>
            <p>We couldnt find any results for '{term}'</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
