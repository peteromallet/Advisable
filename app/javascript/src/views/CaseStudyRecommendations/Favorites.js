import React from "react";
import { Text } from "@advisable/donut";
import CaseStudiesList from "./CaseStudiesList";
import { useSavedArticles } from "./queries";

export default function FavoriteArticles() {
  const { data, loading } = useSavedArticles();

  const articles = data?.savedArticles?.nodes || [];

  return (
    <div>
      <Text fontSize="5xl" fontWeight={600} letterSpacing="-0.04rem" mb={12}>
        Favorites
      </Text>
      {loading && <>loading...</>}
      {articles.length ? <CaseStudiesList articles={articles} /> : null}
    </div>
  );
}
