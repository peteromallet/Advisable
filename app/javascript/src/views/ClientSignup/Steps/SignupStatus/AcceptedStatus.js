import React from "react";
import { Text, Button } from "@advisable/donut";

function AcceptedStatus() {
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
        Let’s get started!
      </Text>
      <Text mb="m">
        The final step before being able to access Advisable’s elite pool of
        talent is a ~10-minute with one of our team. On this call, we’ll ask you
        a couple of clarification questions to ensure that you’re a good fit for
        Advisable, give you an overview of how Advisable works and make you
        aware of the expectations for you as a client when dealing with our
        freelancers.
      </Text>
      <Button>Schedule A Call</Button>
      <Text as="h4">Why do we need to have a call?</Text>
      <Text>
        Advisable offers a money-back guarantee on any freelancer we recommend
        so we want to make sure we fully understand your requirements so we can
        make a perfect recommendation.
      </Text>
    </>
  );
}

export default AcceptedStatus;
