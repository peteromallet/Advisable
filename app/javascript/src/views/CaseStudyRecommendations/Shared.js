import React from "react";
import { Text } from "@advisable/donut";
import CaseStudiesList from "./CaseStudiesList";
import { useSharedArticles } from "./queries";

export default function SharedArticles() {
  const { data, loading } = useSharedArticles();
  const articles = data?.sharedArticles?.map((s) => s.article) || [];

  return (
    <div>
      <Text fontSize="5xl" fontWeight={600} letterSpacing="-0.04rem" mb={2}>
        Shared
      </Text>
      <Text size="lg" color="neutral800" mb={12}>
        Case studies that have been shared with you.
      </Text>
      {loading && <>loading...</>}
      {articles.length ? <CaseStudiesList articles={articles} /> : null}
    </div>
  );
}
