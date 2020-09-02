import React from "react";
import renderLineBreaks from "../../utilities/renderLineBreaks";
import { Box, Text, Paragraph, Stack } from "@advisable/donut";

function ApplicationQuestions({ questions }) {
  return (
    <Box marginBottom="52px">
      {questions.map((q, i) => (
        <Box key={i} marginBottom="52px">
          <Text
            fontSize="18px"
            color="neutral900"
            fontWeight="500"
            marginBottom="8px"
            letterSpacing="-0.02em"
            lineHeight="22px"
          >
            {q.question}
          </Text>
          <Paragraph size="sm" autoLink>
            {renderLineBreaks(q.answer)}
          </Paragraph>
        </Box>
      ))}
    </Box>
  );
}

export default ApplicationQuestions;
