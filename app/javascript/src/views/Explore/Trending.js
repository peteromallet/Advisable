import React from "react";
import { useTrending } from "./queries";
import CaseStudyGrid from "./CaseStudyGrid";
import ExploreViewHeading from "./ExploreViewHeading";
import FeedFooter from "./FeedFooter";
import useViewer from "src/hooks/useViewer";

export default function Trending() {
  const viewer = useViewer();
  const { loading, data } = useTrending();
  const results = data?.topCaseStudies || [];

  return (
    <>
      <ExploreViewHeading title="Trending" description="The latest and greatest projects in SaaS marketing" />
      <CaseStudyGrid loading={loading} results={results} />
      {viewer && !loading && (
        <FeedFooter>
          You've reached the end of the feed.
        </FeedFooter>
      )}
    </>
  );
}
