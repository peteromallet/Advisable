import React from "react";
import { Text, useBreakpoint } from "@advisable/donut";
import { CardHeader } from "../styles";

export default function NoProjectDetails() {
  const isWideScreen = useBreakpoint("sUp");
  return (
    <>
      <CardHeader>Apply to join our network of top freelancers</CardHeader>
      {isWideScreen ? (
        <Text as="p" color="neutral800" fontSize="m" lineHeight="m">
          Enter your details now to get started.
        </Text>
      ) : null}
    </>
  );
}
