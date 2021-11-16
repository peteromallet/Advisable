import React from "react";
import { Box, Stack, Text } from "@advisable/donut";
import Project from "./Project";
import SectionHeader from "./SectionHeader";

function EmptyState() {
  return (
    <Box
      width="100%"
      bg="neutral50"
      display="flex"
      border="2px solid"
      borderColor="neutral100"
      alignItems="center"
      justifyContent="center"
      borderRadius="20px"
      paddingY={10}
    >
      <Text color="neutral500" fontWeight={350}>
        No Case Studies have been created recently
      </Text>
    </Box>
  );
}

export default function LatestProjects({ topCaseStudies }) {
  const caseStudies = topCaseStudies.map((cs) => (
    <Project caseStudy={cs} key={cs.id} />
  ));

  return (
    <>
      <SectionHeader mb={3}>Latest projects</SectionHeader>
      {caseStudies.length > 0 ? (
        <Stack spacing={6} divider="neutral100">
          {caseStudies}
        </Stack>
      ) : (
        <EmptyState />
      )}
    </>
  );
}
