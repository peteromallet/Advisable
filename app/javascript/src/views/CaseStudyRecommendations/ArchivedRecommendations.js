import React from "react";
import { Box, Text } from "@advisable/donut";
import { useParams } from "react-router";
import { useArchived } from "./queries";
import RecommendationCard from "./RecommendationCard";

export default function ArchivedRecommendations() {
  const { id } = useParams();
  const { data, loading } = useArchived({ variables: { id } });

  if (loading || !data) return <>loading...</>;

  const search = data.caseStudySearch;
  const { edges } = search.archived;

  if (edges.length === 0) {
    return (
      <Box
        mx="auto"
        paddingY={16}
        maxWidth={500}
        bg="neutral100"
        textAlign="center"
        borderRadius="16px"
      >
        <Text fontSize="lg" fontWeight={500} mb={2}>
          No archived case studies
        </Text>
        <Text>Case studies will show up here when you archive them.</Text>
      </Box>
    );
  }

  return edges.map((edge) => (
    <Box key={edge.node.id} paddingBottom={4}>
      <RecommendationCard caseStudy={edge.node} search={search} />
    </Box>
  ));
}
