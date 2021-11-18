import React from "react";
import { Text } from "@advisable/donut";

export default function SectionHeader(props) {
  return (
    <Text
      as="h4"
      lineHeight="36px"
      color="neutral900"
      fontSize="2xl"
      fontWeight={520}
      letterSpacing="-0.02rem"
      {...props}
    />
  );
}
