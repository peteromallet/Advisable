import React, { useCallback } from "react";
import { useBreakpoint } from "@advisable/donut";
import { useFeed } from "./queries";
import FeedItem from "./components/FeedItem";
import EndlessScroll from "./components/EndlessScroll";
import FeedItemSkeleton from "./components/FeedItemSkeleton";
import FeedContainer from "./components/FeedContainer";
import EmptyFeed from "./components/EmptyFeed";
import AccountConfirmationPrompt from "src/components/AccountConfirmationPrompt";
import FeedTour from "./components/FeedTour";

export default function MainFeed() {
  const isDesktop = useBreakpoint("mUp");
  const { data, loading, fetchMore } = useFeed();

  const handleLoadMore = useCallback(() => {
    if (!data) return;
    if (!data.feed.pageInfo.hasNextPage) return;
    fetchMore({ variables: { cursor: data.feed.pageInfo.endCursor } });
  }, [fetchMore, data]);

  const pageInfo = data?.feed?.pageInfo;
  const edges = data?.feed?.edges || [];
  const results = edges.map((n) => n.node);

  return (
    <FeedContainer>
      {results.length > 0 && isDesktop && <FeedTour />}
      <div className="" data-walkthrough="feed">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5 md:mb-8">
          Your feed
        </h2>
        <div className="space-y-6">
          <AccountConfirmationPrompt />
          {results.map((result) => (
            <FeedItem
              key={result.id}
              article={result.article}
              interest={result.interest}
            />
          ))}
          {loading && (
            <>
              <FeedItemSkeleton />
              <FeedItemSkeleton />
            </>
          )}
          {!loading && results.length === 0 && <EmptyFeed />}
        </div>
        {pageInfo?.hasNextPage && <EndlessScroll onLoadMore={handleLoadMore} />}

        {results.length > 0 && !pageInfo?.hasNextPage && (
          <div className="text-center text-neutral400 py-10">
            You have reached the end of the feed
          </div>
        )}
      </div>
    </FeedContainer>
  );
}
