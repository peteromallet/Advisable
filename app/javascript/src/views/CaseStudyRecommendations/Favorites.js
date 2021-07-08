import React from "react";
import { Box, Text } from "@advisable/donut";
import CaseStudiesList from "./CaseStudiesList";
import { useSavedArticles } from "./queries";
import illustration from "src/illustrations/empty_folder.svg";

function FavouritesEmpty() {
  return (
    <Box paddingY={12} paddingX={4} maxWidth={400} mx="auto" textAlign="center">
      <Box marginBottom={4}>
        <img src={illustration} alt="" />
      </Box>
      <Text fontSize="lg" fontWeight={500} marginBottom={2}>
        No favorites
      </Text>
      <Text fontSize="sm" color="neutral700" lineHeight="20px">
        You haven&apos;t favorited any articles yet. When you favorite a case
        study you can find it here.
      </Text>
    </Box>
  );
}

export default function FavoriteArticles() {
  const { data, loading } = useSavedArticles();

  const articles = data?.savedArticles?.nodes || [];

  return (
    <div>
      <Text fontSize="5xl" fontWeight={600} letterSpacing="-0.04rem">
        Favorites
      </Text>
      <Box marginY={8} height="1px" bg="neutral200" />
      {loading && <>loading...</>}
      {articles.length ? (
        <CaseStudiesList articles={articles} />
      ) : (
        <FavouritesEmpty />
      )}
    </div>
  );
}
