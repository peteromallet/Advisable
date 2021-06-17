import React from "react";
import { Text } from "@advisable/donut";

export default function Header(props) {
  return (
    <Text
      as="h1"
      fontSize="5xl"
      color="cyan700"
      fontWeight="medium"
      letterSpacing="-0.03rem"
      mb={2.5}
      {...props}
    />
  );
}
