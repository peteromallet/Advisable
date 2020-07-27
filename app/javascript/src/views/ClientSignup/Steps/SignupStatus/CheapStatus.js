import React from "react";
import { Text, Button, Link } from "@advisable/donut";
import MotionStack from "../MotionStack";

function CheapStatus() {
  return (
    <MotionStack>
      <Text
        as="h2"
        mb="s"
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
        you, we recommend Upwork.com.
      </Text>
      <Link.External href="https://www.upwork.com/">
        <Button width={[1, "auto"]}>Go To Upwork</Button>
      </Link.External>
    </MotionStack>
  );
}

export default CheapStatus;
