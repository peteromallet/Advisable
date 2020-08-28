import React from "react";
import renderLineBreaks from "../../utilities/renderLineBreaks";
import { Box, Text } from "@advisable/donut";

export default function SpecialistIntroduction({ application }) {
  return (
    <Box marginBottom="52px">
      <Text
        fontSize="19px"
        color="neutral900"
        fontWeight="500"
        marginBottom="12px"
        letterSpacing="-0.02em"
      >
        About {application.specialist.firstName}
      </Text>
      <Text
        autoLink
        fontSize="15px"
        fontWeight="300"
        lineHeight="22px"
        color="neutral800"
        letterSpacing="0.01em"
      >
        {renderLineBreaks(application.introduction)}
      </Text>
    </Box>
  );
}
