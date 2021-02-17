import React from "react";
import { Text } from "@advisable/donut";

export default function StepNumber({ children }) {
  return (
    <Text
      color="cyan800"
      textTransform="uppercase"
      fontWeight="medium"
      fontSize="2xs"
    >
      {children}
    </Text>
  );
}
