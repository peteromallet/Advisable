import React from "react";
import renderLineBreaks from "../../utilities/renderLineBreaks";
import { Box, Text, Stack } from "@advisable/donut";

function ApplicationQuestions({ questions }) {
  return (
    <Box marginBottom="52px">
      <Text
        fontSize="19px"
        fontWeight="500"
        color="neutral900"
        marginBottom="16px"
        letterSpacing="-0.02em"
      >
        Application Questions
      </Text>
      <Stack spacing="m">
        {questions.map((q, i) => (
          <Box key={i} padding="16px" borderRadius="12px" bg="neutral100">
            <Text
              autoLink
              color="neutral900"
              fontWeight="500"
              marginBottom="8px"
              lineHeight="20px"
              letterSpacing="-0.02em"
            >
              {q.question}
            </Text>
            <Text
              fontSize="15px"
              lineHeight="20px"
              color="neutral800"
              fontWeight="300"
              letterSpacing="0.01em"
              autoLink
            >
              {renderLineBreaks(q.answer)}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default ApplicationQuestions;
