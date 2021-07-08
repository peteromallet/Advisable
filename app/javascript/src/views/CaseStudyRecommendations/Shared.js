import React from "react";
import { Text } from "@advisable/donut";
import CaseStudiesList from "./CaseStudiesList";

export default function SharedArticles() {
  return (
    <div>
      <Text fontSize="5xl" fontWeight={600} letterSpacing="-0.04rem" mb={2}>
        Shared
      </Text>
      <Text size="lg" color="neutral800" mb={12}>
        Case studies that have been shared with you.
      </Text>
      {/* <CaseStudiesList /> */}
    </div>
  );
}
