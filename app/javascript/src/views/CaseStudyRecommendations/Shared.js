import React from "react";
import { Box, Text } from "@advisable/donut";
import CaseStudiesList from "./CaseStudiesList";
import { useSharedArticles } from "./queries";
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
  const articles = data?.sharedArticles?.map((s) => s.article) || [];

  return (
    <div>
      <Text fontSize="5xl" fontWeight={600} letterSpacing="-0.04rem" mb={2}>
        Shared
      </Text>
      <Box marginY={8} height="1px" bg="neutral200" />
      {loading && <>loading...</>}
      {!loading && articles.length ? (
        <CaseStudiesList articles={articles} />
      ) : (
        <SharedEmpty />
      )}
    </div>
  );
}
