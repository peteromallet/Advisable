import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useInterest } from "./queries";
import FeedItem from "./components/FeedItem";
import EndlessScroll from "./components/EndlessScroll";
import SearchIllustration from "src/illustrations/zest/search";
import FeedContainer from "./components/FeedContainer";
import FeedItemSkeleton from "./components/FeedItemSkeleton";
import InterestEmpty from "./components/InterestEmpty";
import RemoveInterest from "./components/RemoveInterest";

export default function Interest() {
  const { interest: id } = useParams();
  const { data, loading, fetchMore } = useInterest({
    variables: { id },
    fetchPolicy: "cache-and-network",
  });

  const handleLoadMore = useCallback(() => {
    if (!data) return;
    if (!data.feed.pageInfo.hasNextPage) return;
    fetchMore({ variables: { cursor: data.feed.pageInfo.endCursor } });
  }, [fetchMore, data]);

  if (!loading && !data.interest) {
    return (
      <div className="w-[300px] mx-auto text-center">
        <SearchIllustration
          width="200px"
          className="mx-auto"
          primaryColor="var(--color-pink-100)"
        />
        <h5 className="font-semibold">Not Found</h5>
        <p>Oops, The page you were looking for could not be found</p>
      </div>
    );
  }

  const initialLoad = loading && !data;
  const pageInfo = data?.interest?.articles?.pageInfo;
  const edges = data?.interest?.articles?.edges || [];
  const results = edges.map((e) => e.node);
  const hasResults = results.length > 0;

  return (
    <FeedContainer>
      <div>
        <div className="mb-8 flex items-center justify-between">
          {initialLoad ? (
            <div className="m-2 w-[250px] h-[28px] bg-neutral100 animate-pulse rounded-md" />
          ) : (
            <>
              <h2 className="text-3xl font-semibold tracking-tight capitalize">
                {data?.interest?.term}
              </h2>
              <RemoveInterest interest={data?.interest} />
            </>
          )}
        </div>
        <div className="space-y-6">
          {results.map((result) => (
            <FeedItem key={result.id} article={result} />
          ))}
          {loading && (
            <>
              <FeedItemSkeleton />
              <FeedItemSkeleton />
              <FeedItemSkeleton />
            </>
          )}
        </div>

        {!loading && !hasResults && <InterestEmpty />}

        {pageInfo?.hasNextPage && <EndlessScroll onLoadMore={handleLoadMore} />}
        {results.length > 0 && !pageInfo?.hasNextPage && (
          <div className="text-center text-neutral400 py-10">
            You have reached the end of this topic
          </div>
        )}
      </div>
    </FeedContainer>
  );
}
