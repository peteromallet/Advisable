import React from "react";
import renderLineBreaks from "../../utilities/renderLineBreaks";
import { Box, Text, Stack } from "@advisable/donut";

function ApplicationQuestions({ questions }) {
  return (
    <Box marginBottom="52px">
      <Text
        fontSize="18px"
        color="neutral900"
        fontWeight="500"
        marginBottom="12px"
        letterSpacing="-0.02em"
      >
        Questions
      </Text>
      <Stack spacing="l">
        {questions.map((q, i) => (
          <Box key={i}>
            <Text
              fontSize="16px"
              fontWeight="medium"
              marginBottom="4px"
              lineHeight="20px"
              autoLink
            >
              {q.question}
            </Text>
            <Text lineHeight="20px" color="neutral800" autoLink>
              {renderLineBreaks(q.answer)}
            </Text>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}

export default ApplicationQuestions;
