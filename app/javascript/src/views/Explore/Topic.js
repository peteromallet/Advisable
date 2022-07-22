import React, { useCallback } from "react";
import { useTopic } from "./queries";
import "./explore.css";
import CaseStudyGrid from "./CaseStudyGrid";
import { useParams } from "react-router-dom";
import EndlessScroll from "./EndlessScroll";

export default function Topic() {
  const { slug } = useParams();
  const { loading, data, fetchMore } = useTopic(slug);

  const pageInfo = data?.topic?.articles?.pageInfo;
  const edges = data?.topic?.articles?.edges || [];
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
        <h1 className="mb-1 text-4xl font-bold tracking-tight text-neutral900">
          {data?.topic?.name}
        </h1>
        <p className="text-lg text-neutral-500">{data?.topic?.description}</p>
      </div>
      <CaseStudyGrid loading={loading} results={results} />
      {pageInfo?.hasNextPage && <EndlessScroll onLoadMore={handleLoadMore} />}
    </>
  );
}
