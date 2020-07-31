import React from "react";
import { Text } from "@advisable/donut";

export function JobSetupStepHeader(props) {
  return (
    <Text
      color="blue900"
      fontSize={{ _: "28px", m: "30px" }}
      fontWeight="medium"
      letterSpacing="-0.05em"
      {...props}
    />
  );
}

export function JobSetupStepSubHeader(props) {
  return (
    <Text
      fontSize={{ _: "16px", m: "17px" }}
      fontWeight="400"
      lineHeight={{ _: "20px", m: "24px" }}
      color="#4A4D66"
      letterSpacing="-0.02em"
      {...props}
    />
  );
}
