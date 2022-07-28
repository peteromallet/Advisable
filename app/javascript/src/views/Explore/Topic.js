import React, { useCallback } from "react";
import { useTopic } from "./queries";
import "./explore.css";
import CaseStudyGrid from "./CaseStudyGrid";
import { useParams } from "react-router-dom";
import EndlessScroll from "./EndlessScroll";
import ExploreViewHeading from "./ExploreViewHeading";

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
      <ExploreViewHeading title={topic.name} description={topic.description} loading={!topic.name && loading} />
      <CaseStudyGrid loading={loading} results={results} />
      {pageInfo?.hasNextPage && <EndlessScroll onLoadMore={handleLoadMore} />}
    </>
  );
}
