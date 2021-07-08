import React from "react";
import { Text } from "@advisable/donut";
import CaseStudiesList from "./CaseStudiesList";
import { useArchivedArticles } from "./queries";

export default function ArchivedArticles() {
  const { data, loading } = useArchivedArticles();
  const articles = data?.ArchivedArticles?.nodes || [];

  return (
    <div>
      <Text fontSize="5xl" fontWeight={600} letterSpacing="-0.04rem" mb={12}>
        Archived
      </Text>
      {loading && <>loading...</>}
      {articles.length ? <CaseStudiesList articles={articles} /> : null}
    </div>
  );
}
