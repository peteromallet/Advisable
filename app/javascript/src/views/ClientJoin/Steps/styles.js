import React from "react";
import { Text } from "@advisable/donut";

export const CardHeader = (props) => (
  <Text
    as="h2"
    mb={2}
    fontSize={["3xl", "4xl"]}
    color="neutral800"
    fontWeight="medium"
    letterSpacing="-0.02rem"
    {...props}
  />
);
