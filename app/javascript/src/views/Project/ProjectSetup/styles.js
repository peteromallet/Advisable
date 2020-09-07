import React from "react";
import { Text } from "@advisable/donut";

export function JobSetupStepHeader(props) {
  return (
    <Text
      color="blue900"
      fontSize={{ _: "28px", m: "4xl" }}
      fontWeight="medium"
      letterSpacing="-0.03em"
      {...props}
    />
  );
}

export function JobSetupStepSubHeader(props) {
  return (
    <Text
      fontSize={{ _: "16px", m: "lg" }}
      fontWeight="400"
      lineHeight={{ _: "20px", m: "24px" }}
      color="neutral800"
      letterSpacing="-0.01em"
      {...props}
    />
  );
}
