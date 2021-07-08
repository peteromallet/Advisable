import React from "react";
import { Stack } from "@advisable/donut";
import CaseStudyCard from "./RecommendationCard";

export default function CaseStudiesList({ articles }) {
  return (
    <Stack spacing="4xl" divider="neutral200">
      {articles.map((caseStudy) => (
        <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
      ))}
    </Stack>
  );
}
