import React from "react";
import { Text } from "@advisable/donut";

export default function Reviewed() {
  return (
    <>
      <Text
        mb="12px"
        color="blue900"
        fontSize="28px"
        lineHeight="32px"
        fontWeight="medium"
        letterSpacing="-0.02em"
        textAlign="center"
      >
        Project validated
      </Text>
      <Text
        fontSize="17px"
        lineHeight="24px"
        color="neutral700"
        mb="40px"
        textAlign="center"
      >
        This project has already been validated.
      </Text>
    </>
  );
}
