import React from "react";
import { Text, Button } from "@advisable/donut";

function NotHiringStatus() {
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
        It seems like you&apos;re not planning on hiring freelancers over the
        next while. However, we&apos;ll be happy to send you a reminder in six
        months if you click the button below.
      </Text>
      <Button>Remind Me</Button>
    </>
  );
}

export default NotHiringStatus;
