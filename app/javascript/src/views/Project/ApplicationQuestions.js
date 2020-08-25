import React from "react";
import renderLineBreaks from "../../utilities/renderLineBreaks";
import { Card, Box, Text, Stack } from "@advisable/donut";

function ApplicationQuestions({ questions }) {
  return (
    <Card padding="32px" marginBottom="52px">
      <Text
        fontSize="18px"
        fontWeight="500"
        color="neutral900"
        marginBottom="24px"
        letterSpacing="-0.02em"
      >
        Questions
      </Text>
      <Stack spacing="xxl">
        {questions.map((q, i) => (
          <Box key={i}>
            <Text
              autoLink
              color="neutral900"
              fontWeight="500"
              marginBottom="8px"
              lineHeight="22px"
              letterSpacing="-0.02em"
            >
              {q.question}
            </Text>
            <Text lineHeight="22px" color="neutral800" autoLink>
              {renderLineBreaks(q.answer)}
            </Text>
          </Box>
        ))}
      </Stack>
    </Card>
  );
}

export default ApplicationQuestions;
