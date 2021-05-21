import React from "react";
import { Box } from "@advisable/donut";
import { useParams } from "react-router";
import { useArchived } from "./queries";
import RecommendationCard from "./RecommendationCard";

export default function ArchivedRecommendations() {
  const { id } = useParams();
  const { data, loading } = useArchived({ variables: { id } });

  if (loading || !data) return <>loading...</>;

  const search = data.caseStudySearch;
  const { edges } = search.archived;

  return edges.map((edge) => (
    <Box key={edge.node.id} paddingBottom={4}>
      <RecommendationCard caseStudy={edge.node} search={search} />
    </Box>
  ));
}
