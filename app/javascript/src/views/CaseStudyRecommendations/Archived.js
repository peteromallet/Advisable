import React from "react";
import { Text } from "@advisable/donut";
import CaseStudiesList from "./CaseStudiesList";

export default function ArchivedArticles() {
  return (
    <div>
      <Text fontSize="5xl" fontWeight={600} letterSpacing="-0.04rem" mb={2}>
        Archived
      </Text>
      <Text size="lg" color="neutral800" mb={12}>
        See how our freelancers have helped similar companies achieve their
        goals.
      </Text>
      <CaseStudiesList />
    </div>
  );
}
