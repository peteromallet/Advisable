import React from "react";
import { Box, Text, Stack } from "@advisable/donut";
import CardsSkeleton from "./CardsSkeleton";
import { useSharedArticles } from "./queries";
import CaseStudyCard from "./RecommendationCard";
import inbox from "src/illustrations/empty_inbox.svg";

function SharedEmpty() {
  return (
    <Box paddingY={12} paddingX={4} maxWidth={400} mx="auto" textAlign="center">
      <Box marginBottom={4}>
        <img src={inbox} alt="" />
      </Box>
      <Text fontSize="lg" fontWeight={500} marginBottom={2}>
        No shared articles
      </Text>
      <Text fontSize="sm" color="neutral700" lineHeight="20px">
        You don&apos;t have any shared articles yet. When someone shares a case
        study with you it will appear here.
      </Text>
    </Box>
  );
}

export default function SharedArticles() {
  const { data, loading } = useSharedArticles();
  const sharedArticles = data?.sharedArticles || [];

  return (
    <div>
      <Text fontSize="5xl" fontWeight={600} letterSpacing="-0.04rem" mb={2}>
        Shared
      </Text>
      <Box marginY={8} height="1px" bg="neutral200" />
      {loading && <CardsSkeleton />}
      {!loading && sharedArticles.length > 0 && (
        <Stack spacing="4xl" divider="neutral200">
          {sharedArticles.map((sharedArticle) => (
            <CaseStudyCard
              key={sharedArticle.id}
              caseStudy={sharedArticle.article}
              sharedArticle={sharedArticle}
            />
          ))}
        </Stack>
      )}
      {!loading && sharedArticles.length === 0 && <SharedEmpty />}
    </div>
  );
}
