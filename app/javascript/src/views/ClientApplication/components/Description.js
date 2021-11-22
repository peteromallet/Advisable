import React from "react";
import { Text } from "@advisable/donut";

export default function Description(props) {
  return (
    <Text
      mb={8}
      color="neutral800"
      fontSize="lg"
      fontWeight={420}
      lineHeight="1.2"
      {...props}
    />
  );
}
