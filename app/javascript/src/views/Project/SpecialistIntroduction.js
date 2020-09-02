import React from "react";
import renderLineBreaks from "../../utilities/renderLineBreaks";
import { Box, Text, Paragraph } from "@advisable/donut";

export default function SpecialistIntroduction({ application }) {
  return (
    <Box marginBottom="52px">
      <Text
        fontSize="18px"
        color="neutral900"
        fontWeight="500"
        marginBottom="8px"
        letterSpacing="-0.02em"
      >
        About {application.specialist.firstName}
      </Text>
      <Paragraph autoLink size="sm">
        {renderLineBreaks(application.introduction)}
      </Paragraph>
    </Box>
  );
}
