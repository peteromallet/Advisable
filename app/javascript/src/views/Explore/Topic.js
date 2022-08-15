import React, { useCallback } from "react";
import { useTopic } from "./queries";
import CaseStudyGrid from "./CaseStudyGrid";
import { useParams } from "react-router-dom";
import EndlessScroll from "./EndlessScroll";
import ExploreViewHeading from "./ExploreViewHeading";
import FeedFooter from "./FeedFooter";
import { isNotFound } from "../NotFound";
import LostIllustration from "src/illustrations/zest/lost";

export default function Topic() {
  const { slug } = useParams();
  const { loading, data, fetchMore, error } = useTopic(slug);

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
  }, [slug, fetchMore, data]);

  if (isNotFound(error)) {
    return (
      <div className="w-[300px] py-12 mx-auto text-center">
        <LostIllustration width="200px" className="mx-auto mb-8" />
        <h4 className="font-semibold">Oops</h4>
        <p>We can't seem to find the page you're looking for.</p>
      </div>
    );
  }

  return (
    <>
      <ExploreViewHeading
        title={topic.name}
        description={topic.description}
        loading={!topic.name && loading}
      />
      <CaseStudyGrid loading={loading} results={results} />
      {pageInfo?.hasNextPage && <EndlessScroll onLoadMore={handleLoadMore} />}
      {!loading && !pageInfo?.hasNextPage && (
        <FeedFooter>You've reached the end of the list.</FeedFooter>
      )}
    </>
  );
}
