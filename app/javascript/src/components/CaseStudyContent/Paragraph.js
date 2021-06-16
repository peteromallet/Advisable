import React from "react";
import { Text } from "@advisable/donut";
import renderLineBreaks from "src/utilities/renderLineBreaks";

export default function CaseStudyParagraph({ text }) {
  return (
    <Text
      fontWeight={350}
      fontSize="18px"
      lineHeight="24px"
      paddingTop={4}
      paddingBottom={5}
      autoLink
    >
      {renderLineBreaks(text)}
    </Text>
  );
}
