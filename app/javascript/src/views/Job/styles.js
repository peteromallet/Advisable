import React from "react";
import { Text } from "@advisable/donut";

export function JobSetupStepHeader(props) {
  return (
    <Text
      color="blue900"
      fontSize="32px"
      fontWeight="medium"
      letterSpacing="-0.04em"
      {...props}
    />
  );
}

export function JobSetupStepSubHeader(props) {
  return (
    <Text
      fontSize="17px"
      fontWeight="400"
      lineHeight="22px"
      color="neutral600"
      letterSpacing="-0.02em"
      {...props}
    />
  );
}
