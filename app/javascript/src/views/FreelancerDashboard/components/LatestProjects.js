import React from "react";
import { Stack, Box, Text } from "@advisable/donut";
import Project from "./Project";

export default function LatestProjects({ topCaseStudies }) {
  const caseStudies = topCaseStudies.map((cs) => (
    <Project caseStudy={cs} key={cs.id} />
  ));

  if (caseStudies.length === 0) return null;

  return (
    <>
      <Text
        color="neutral900"
        fontSize="2xl"
        lineHeight="36px"
        fontWeight={450}
        mb={6}
      >
        Latest projects
      </Text>
      <Stack spacing={10} divider="neutral100">
        {caseStudies}
      </Stack>
    </>
  );
}
