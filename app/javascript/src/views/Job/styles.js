import React from "react";
import { Text } from "@advisable/donut";

export function JobSetupStepHeader(props) {
  return (
    <Text
      color="blue900"
      fontSize="30px"
      fontWeight="medium"
      letterSpacing="-0.05em"
      {...props}
    />
  );
}

export function JobSetupStepSubHeader(props) {
  return (
    <Text
      fontSize="17px"
      fontWeight="400"
      lineHeight="24px"
      color="#4A4D66"
      letterSpacing="-0.02em"
      {...props}
    />
  );
}
