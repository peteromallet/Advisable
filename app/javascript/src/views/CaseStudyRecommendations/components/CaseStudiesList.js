import React from "react";
import { Stack } from "@advisable/donut";
import CaseStudyCard from "./RecommendationCard";

export default function CaseStudiesList({ articles, search }) {
  return (
    <Stack spacing="4xl" divider="neutral200">
      {articles.map((caseStudy) => (
        <CaseStudyCard
          key={caseStudy.id}
          search={search}
          caseStudy={caseStudy}
        />
      ))}
    </Stack>
  );
}
