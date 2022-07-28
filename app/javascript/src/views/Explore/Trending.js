import React from "react";
import { useTrending } from "./queries";
import "./explore.css";
import CaseStudyGrid from "./CaseStudyGrid";
import ExploreViewHeading from "./ExploreViewHeading";

export default function Explore() {
  const { loading, data } = useTrending();
  const results = data?.topCaseStudies || [];

  return (
    <>
      <ExploreViewHeading title="Trending" description="The latest and greatest projects in SaaS marketing" />
      <CaseStudyGrid loading={loading} results={results} />
    </>
  );
}
