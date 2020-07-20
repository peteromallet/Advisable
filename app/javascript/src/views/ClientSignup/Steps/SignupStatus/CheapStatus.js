import React from "react";
import { Text, Button } from "@advisable/donut";

function CheapStatus() {
  return (
    <>
      <Text
        as="h2"
        mb="m"
        color="blue.8"
        fontSize="xxxl"
        lineHeight="xxxl"
        fontWeight="semibold"
        letterSpacing="-0.02em"
      >
        Unfortunately, we&apos;re not a good fit
      </Text>
      <Text mb="m">
        Advisable isn&apos;t suitable for companies like you. For people like
        you, we recommend Upwork.com
      </Text>
      <Button>Go To Upwork</Button>
    </>
  );
}

export default CheapStatus;
