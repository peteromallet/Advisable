import React from "react";
import { Text, theme } from "@advisable/donut";
import { rgba } from "polished";

export default function StepNumber({ children }) {
  return (
    <Text
      color={rgba(theme.colors.cyan900, 0.55)}
      textTransform="uppercase"
      fontWeight="medium"
      fontSize="2xs"
      mb={1.5}
    >
      {children}
    </Text>
  );
}
