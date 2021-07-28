import React from "react";
import { Check } from "@styled-icons/heroicons-solid/Check";
import { Circle, Box, Text } from "@advisable/donut";

export default function CaseStudyResults({ results }) {
  return (
    <Box paddingTop={2} paddingBottom={4}>
      {results.map((result, index) => (
        <Box key={index} display="flex" alignItems="center" marginBottom={4}>
          <Circle
            size={20}
            marginRight={2}
            bg="cyan600"
            color="white"
            flexShrink={0}
          >
            <Check size={12} />
          </Circle>
          <Text
            paddingLeft={1}
            fontSize="lg"
            fontWeight="350"
            lineHeight="24px"
          >
            {result}
          </Text>
        </Box>
      ))}
    </Box>
  );
}
