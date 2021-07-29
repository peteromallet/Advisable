import React from "react";
import { Box, Text } from "@advisable/donut";
import { BadgeCheck } from "@styled-icons/heroicons-solid/BadgeCheck";

export default function CaseStudyResultsRow({ caseStudy }) {
  const outcomeSection = caseStudy.sections.find((s) => s.type === "outcome");
  if (!outcomeSection) return null;
  const resultsBlock = outcomeSection.contents.find(
    (c) => c.__typename === "Results",
  );
  if (!resultsBlock) return null;

  return (
    <Box
      display="grid"
      gridGap={8}
      gridTemplateColumns={{ _: "1fr", m: "1fr 1fr 1fr" }}
    >
      {resultsBlock.results.map((result, index) => (
        <Box
          key={index}
          bg="#ECF2F5"
          padding={6}
          paddingTop={4}
          textAlign="center"
          borderRadius="24px"
        >
          <Box color="#00ADDC" marginBottom={1.5}>
            <BadgeCheck size={28} />
          </Box>
          <Text fontSize="md" fontWeight={450} lineHeight="20px">
            {result}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
