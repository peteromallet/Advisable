import React, { useCallback } from "react";
import Footer from "src/components/Footer";
import CardSkeleton from "./CardSkeleton";
import CaseStudyCard from "./CaseStudyCard";
import EndlessScroll from "./EndlessScroll";
import { useFeed } from "./queries";
import TopicsBar from "./TopicsBar";
import "./explore.css";

const PAGE_SIZE = 15;

export default function Explore() {
  const { loading, data, fetchMore } = useFeed();
  const pageInfo = data?.feed?.pageInfo;
  const edges = data?.feed?.edges || [];
  const results = edges.map((n) => n.node);

  const handleLoadMore = useCallback(() => {
    if (!data) return;
    if (!data.feed.pageInfo.hasNextPage) return;
    fetchMore({ variables: { cursor: data.feed.pageInfo.endCursor } });
  }, [fetchMore, data]);

  return (
    <>
      <div className="max-w-[1300px] mx-auto px-5 pb-10">
        <TopicsBar />
        <div className="h-px mb-8 bg-neutral-200" />
        <div className="mb-8">
          <h1 className="mb-1 text-4xl font-bold tracking-tight text-neutral900">
            Your Feed
          </h1>
          <p className="text-lg text-neutral-500">
            The best projects based on your interests.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-8 gap-6">
          {results.map((result, i) => (
            <CaseStudyCard
              key={result.id}
              article={result.article}
              delay={0.05 * (i % PAGE_SIZE)}
            />
          ))}
          {loading && (
            <>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </>
          )}
          {pageInfo?.hasNextPage && (
            <EndlessScroll onLoadMore={handleLoadMore} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
