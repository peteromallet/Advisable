import React from "react";
import { Text } from "@advisable/donut";

export default function Description(props) {
  return (
    <Text
      fontSize="lg"
      color="neutral800"
      mb={6}
      lineHeight="24px"
      {...props}
    />
  );
}
