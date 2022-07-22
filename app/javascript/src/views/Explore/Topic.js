import React, { useCallback } from "react";
import { useTopic } from "./queries";
import "./explore.css";
import CaseStudyGrid from "./CaseStudyGrid";
import { useParams } from "react-router-dom";
import EndlessScroll from "./EndlessScroll";

export default function Topic() {
  const { slug } = useParams();
  const { loading, data, fetchMore } = useTopic(slug);

  const topic = data?.topic || {};
  const pageInfo = topic?.articles?.pageInfo;
  const edges = topic?.articles?.edges || [];
  const results = edges.map((n) => n.node);

  const handleLoadMore = useCallback(() => {
    if (!data) return;
    if (!data.topic.articles.pageInfo.hasNextPage) return;

    fetchMore({
      variables: {
        slug,
        cursor: data.topic.articles.pageInfo.endCursor,
      },
    });
  }, [fetchMore, data]);

  return (
    <>
      <div className="mb-8">
        <div className="mb-1">
          {!topic.name && loading ? (
            <div className="max-w-[250px] h-[32px] bg-neutral-200 animate-pulse rounded-md mb-5" />
          ) : (
            <h1 className="text-4xl font-bold tracking-tight text-neutral900">
              {topic?.name}
            </h1>
          )}
        </div>
        {!topic.description && loading ? (
          <div className="max-w-[420px] h-[18px] bg-neutral-200 animate-pulse rounded-md" />
        ) : (
          <p className="text-lg text-neutral-500">{topic?.description}</p>
        )}
      </div>
      <CaseStudyGrid loading={loading} results={results} />
      {pageInfo?.hasNextPage && <EndlessScroll onLoadMore={handleLoadMore} />}
    </>
  );
}
