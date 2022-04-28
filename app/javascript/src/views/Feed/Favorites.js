import React, { useCallback } from "react";
import AccountConfirmationPrompt from "src/components/AccountConfirmationPrompt";
import FeedItem from "./components/FeedItem";
import EndlessScroll from "./components/EndlessScroll";
import FeedItemSkeleton from "./components/FeedItemSkeleton";
import FeedContainer from "./components/FeedContainer";
import { useFavoritedArticles } from "./queries";

const EmptyState = () => {
  return (
    <div className="bg-neutral50 ring-1 ring-neutral100 ring-inset rounded-2xl py-10 px-4 text-center">
      <p className="text-neutral500 text-lg">
        You have no favorite case studies yet.
      </p>
    </div>
  );
};

export default function Favorites() {
  const { data, loading, fetchMore } = useFavoritedArticles();

  const handleLoadMore = useCallback(() => {
    if (!data) return;
    if (!data.feed.pageInfo.hasNextPage) return;
    fetchMore({
      variables: { cursor: data.favoritedArticles.pageInfo.endCursor },
    });
  }, [fetchMore, data]);

  const pageInfo = data?.favoritedArticles?.pageInfo;
  const edges = data?.favoritedArticles?.edges || [];
  const results = edges.map((n) => n.node);

  return (
    <FeedContainer>
      <div>
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5 md:mb-8">
          Favorites
        </h2>
        <div className="mb-8">
          <AccountConfirmationPrompt />
        </div>
        <div className="space-y-8">
          {!loading && results.length === 0 && <EmptyState />}
          {results.map((result) => (
            <FeedItem
              key={result.id}
              article={result}
              interest={result.interest}
            />
          ))}
          {loading && (
            <>
              <FeedItemSkeleton />
              <FeedItemSkeleton />
              <FeedItemSkeleton />
            </>
          )}
        </div>
        {pageInfo?.hasNextPage && <EndlessScroll onLoadMore={handleLoadMore} />}
        {results.length > 0 && !pageInfo?.hasNextPage && (
          <div className="text-center text-neutral400 py-10">
            You have reached the end of the list
          </div>
        )}
      </div>
    </FeedContainer>
  );
}
