import React, { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useInterest } from "./queries";
import FeedItem from "./components/FeedItem";
import EndlessScroll from "./components/EndlessScroll";
import SearchIllustration from "src/illustrations/zest/search";

export default function Interest() {
  const { interest: id } = useParams();
  const { data, loading, fetchMore } = useInterest({
    variables: { id },
  });

  const handleLoadMore = useCallback(() => {
    if (!data) return;
    if (!data.feed.pageInfo.hasNextPage) return;
    fetchMore({ variables: { cursor: data.feed.pageInfo.endCursor } });
  }, [fetchMore, data]);

  if (!loading && !data.interest) {
    return (
      <div className="w-[300px] mx-auto text-center">
        <SearchIllustration primaryColor="var(--color-pink-100)" />
        <h5 className="font-semibold">Not Found</h5>
        <p>Oops, The page you were looking for could not be found</p>
      </div>
    );
  }

  const pageInfo = data?.interest?.articles?.pageInfo;
  const edges = data?.interest?.articles?.edges || [];
  const results = edges.map((e) => e.node);

  return (
    <div className="divide-y divide-solid divide-neutral200">
      <h2 className="text-3xl font-semibold tracking-tight mb-8">
        {data?.interest?.term}
      </h2>
      {results.map((result) => (
        <FeedItem key={result.id} article={result} />
      ))}
      {loading && <div>loading...</div>}
      {pageInfo?.hasNextPage && <EndlessScroll onLoadMore={handleLoadMore} />}
      {results.length > 0 && !pageInfo?.hasNextPage && (
        <div className="text-center text-neutral400 py-10">
          You have reached the end of the feed
        </div>
      )}
    </div>
  );
}
