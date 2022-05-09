import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import FeedItem from "./components/FeedItem";
import FeedContainer from "./components/FeedContainer";
import FeedItemSkeleton from "./components/FeedItemSkeleton";
import { useCreateSearch } from "./queries";
import AddInterestPreviewButton from "./components/AddInterestPreviewButton";
import NoResults from "./components/NoResults";
import { trackEvent } from "src/utilities/segment";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const [createSearch, { data, loading }] = useCreateSearch();
  const query = searchParams.get("q");

  useEffect(() => {
    trackEvent("Search", { query });
  }, [query]);

  useEffect(() => {
    createSearch({
      variables: {
        input: {
          term: query,
        },
      },
    });
  }, [createSearch, query]);

  const isLoading = loading && !data;
  const interestPreview = data?.createCaseStudyInterestPreview?.interestPreview;
  const edges = interestPreview?.articles?.edges || [];
  const results = edges.map((e) => e.node);
  const hasResults = results.length > 0;

  return (
    <FeedContainer>
      <div>
        <div className="mb-8 flex justify-between items-center">
          <h2 className="text-3xl font-semibold tracking-tight capitalize">
            {query}
          </h2>
          <AddInterestPreviewButton interestPreview={interestPreview} />
        </div>
        {!isLoading && !hasResults && <NoResults />}
        <div className="space-y-6">
          {results.map((result) => (
            <FeedItem key={result.id} article={result} />
          ))}
          {isLoading && (
            <>
              <FeedItemSkeleton />
              <FeedItemSkeleton />
            </>
          )}

          {hasResults && (
            <div className="text-center py-10">
              <div className="text-neutral400">
                You have reached the end of this topic
              </div>
              <Link
                to="/explore/search"
                className="text-blue-600 hover:text-blue-900"
              >
                Search again
              </Link>
            </div>
          )}
        </div>
      </div>
    </FeedContainer>
  );
}
