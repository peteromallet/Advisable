import React from "react";
import { Text } from "@advisable/donut";

export default function SectionTitle({ children }) {
  return (
    <Text
      fontSize="xs"
      fontWeight="medium"
      color="neutral400"
      textTransform="uppercase"
      letterSpacing="0.06rem"
    >
      {children}
    </Text>
  );
}
