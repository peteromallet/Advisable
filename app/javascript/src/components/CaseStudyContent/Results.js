import React from "react";
import { Check } from "@styled-icons/heroicons-solid/Check";
import { Circle, Box, Text } from "@advisable/donut";

export default function CaseStudyResults({ results }) {
  return (
    <Box paddingTop={2} paddingBottom={4}>
      {results.map((result, index) => (
        <Box key={index} display="flex" alignItems="center" marginBottom={3}>
          <Circle size={20} marginRight={2} bg="cyan600" color="white">
            <Check size={12} />
          </Circle>
          <Text fontSize="lg" fontWeight="350">
            {result}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
