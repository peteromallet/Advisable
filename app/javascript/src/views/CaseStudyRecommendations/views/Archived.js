import React from "react";
import { Box, Text } from "@advisable/donut";
import CaseStudiesList from "../components/CaseStudiesList";
import CardsSkeleton from "../components/CardsSkeleton";
import { useArchivedArticles } from "../queries";
import inbox from "src/illustrations/box.svg";

function ArchivedEmpty() {
  return (
    <Box paddingY={12} paddingX={4} maxWidth={400} mx="auto" textAlign="center">
      <Box marginBottom={6}>
        <img src={inbox} alt="" />
      </Box>
      <Text fontSize="lg" fontWeight={500} marginBottom={2}>
        No archived articles
      </Text>
      <Text fontSize="sm" color="neutral700" lineHeight="20px">
        You haven&apos;t archived any recommendations yet.
      </Text>
    </Box>
  );
}

export default function ArchivedArticles() {
  const { data, loading } = useArchivedArticles();
  const articles = data?.archivedArticles?.nodes || [];

  return (
    <div>
      <Text fontSize="5xl" fontWeight={600} letterSpacing="-0.04rem">
        Archived
      </Text>
      <Box marginY={8} height="1px" bg="neutral200" />
      {loading && <CardsSkeleton />}
      {!loading && articles.length > 0 && (
        <CaseStudiesList articles={articles} />
      )}
      {!loading && articles.length === 0 && <ArchivedEmpty />}
    </div>
  );
}
