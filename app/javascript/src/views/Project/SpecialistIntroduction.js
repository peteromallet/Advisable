import React from "react";
import renderLineBreaks from "../../utilities/renderLineBreaks";
import { Card, Text } from "@advisable/donut";

export default function SpecialistIntroduction({ application }) {
  return (
    <Card padding="32px" marginBottom="52px">
      <Text
        fontSize="18px"
        color="neutral900"
        fontWeight="500"
        marginBottom="12px"
        letterSpacing="-0.02em"
      >
        About {application.specialist.firstName}
      </Text>
      <Text
        autoLink
        color="neutral700"
        lineHeight="22px"
        letterSpacing="-0.01em"
      >
        {renderLineBreaks(application.introduction)}
      </Text>
    </Card>
  );
}
