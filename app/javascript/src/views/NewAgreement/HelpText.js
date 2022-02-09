import React from "react";
import { Box, Text } from "@advisable/donut";
import { QuestionMarkCircle } from "@styled-icons/heroicons-solid";

export default function HelpText({ children }) {
  return (
    <Box padding={6} bg="blue50" borderRadius="24px" width="100%">
      <Box color="blue900" marginBottom={4}>
        <QuestionMarkCircle size={40} />
      </Box>
      <Text lineHeight="24px" fontSize="l">
        {children}
      </Text>
    </Box>
  );
}
