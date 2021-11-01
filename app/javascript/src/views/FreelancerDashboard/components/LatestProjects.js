import React from "react";
import { Box, Text } from "@advisable/donut";
import Project from "./Project";

export default function LatestProjects({ topCaseStudies }) {
  const caseStudies = topCaseStudies.map((cs) => (
    <Project caseStudy={cs} key={cs.id} />
  ));

  if (caseStudies.length === 0) return null;

  return (
    <>
      <Text color="neutral900" fontSize="2xl" fontWeight={450} mb={8}>
        Latest projects
      </Text>
      <Box>{caseStudies}</Box>
    </>
  );
}
