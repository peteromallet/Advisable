import React from "react";
import { useTrending } from "./queries";
import "./explore.css";
import CaseStudyGrid from "./CaseStudyGrid";

export default function Explore() {
  const { loading, data } = useTrending();
  const results = data?.topCaseStudies || [];

  return (
    <>
      <div className="mb-8">
        <h1 className="mb-1 text-4xl font-bold tracking-tight text-neutral900">
          Trending
        </h1>
        <p className="text-lg text-neutral-500">
          The latest and greatest projects in SaaS marketing.
        </p>
      </div>
      <CaseStudyGrid loading={loading} results={results} />
    </>
  );
}
