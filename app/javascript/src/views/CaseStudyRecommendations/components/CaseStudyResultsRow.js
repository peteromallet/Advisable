import React from "react";
import { Box, Text, Circle } from "@advisable/donut";
import { Flag } from "@styled-icons/heroicons-outline/Flag";

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
      gridGap={{ _: 4, l: 8 }}
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
          <Circle
            size={40}
            bg="white"
            color="cyan500"
            marginBottom={3}
            position="relative"
          >
            <Flag size={24} />
            <Circle
              size={20}
              color="white"
              bg="cyan900"
              fontSize="12px"
              fontWeight={500}
              position="absolute"
              right="-4px"
              bottom="-4px"
            >
              {index + 1}
            </Circle>
          </Circle>
          <Text fontSize="md" fontWeight={450} lineHeight="20px">
            {result}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
