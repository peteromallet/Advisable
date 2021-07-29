import React from "react";
import { Text } from "@advisable/donut";
import renderLineBreaks from "src/utilities/renderLineBreaks";

export default function CaseStudyParagraph({ text }) {
  return (
    <Text
      fontWeight={400}
      fontSize="18px"
      lineHeight="28px"
      paddingTop={2}
      paddingBottom={4}
      autoLink
    >
      {renderLineBreaks(text)}
    </Text>
  );
}
