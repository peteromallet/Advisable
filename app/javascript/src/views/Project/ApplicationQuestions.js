import React from "react";
import renderLineBreaks from "../../utilities/renderLineBreaks";
import { Box, Text, Stack } from "@advisable/donut";

function ApplicationQuestions({ questions }) {
  return (
    <Box marginBottom="52px">
      <Stack spacing="xl">
        {questions.map((q, i) => (
          <Box key={i}>
            <Text
              autoLink
              fontSize="18px"
              color="neutral900"
              fontWeight="500"
              marginBottom="8px"
              lineHeight="22px"
              letterSpacing="-0.02em"
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
