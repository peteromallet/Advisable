import React from "react";
import { Text } from "@advisable/donut";

export const Header = (props) => (
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

export const Description = (props) => (
  <Text color="neutral700" mb={4} lineHeight="s" {...props} />
);
