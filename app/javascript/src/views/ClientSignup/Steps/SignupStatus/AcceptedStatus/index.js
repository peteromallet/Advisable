import React from "react";
import PropTypes from "prop-types";
import { Text, Box, useModal, Button } from "@advisable/donut";
import RequestCallButton from "../RequestCallButton";
import {
  useLocationState,
  useRequestApplicationCallback,
} from "../../../queries";
import { Redirect } from "react-router";
import PhoneModal from "./PhoneModal";

function AcceptedStatus({ firstName, lastName }) {
  const [
    requestApplicationCallback,
    { data, called },
  ] = useRequestApplicationCallback();
  const fullName = `${firstName} ${lastName}`;
  const { email, applicationId } = useLocationState();
  const modal = useModal();

  if (data)
    return <Redirect push to="/clients/signup/thank-you-call-you-shortly" />;

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
      <Box mb="m">
        <RequestCallButton
          mr="s"
          fullName={fullName}
          email={email}
          id={applicationId}
        >
          Schedule A Call
        </RequestCallButton>
        <Button loading={called} onClick={modal.show} variant="subtle">
          Call Me ASAP
        </Button>
        <PhoneModal
          requestApplicationCallback={requestApplicationCallback}
          modal={modal}
        />
      </Box>
      <Text
        as="h4"
        fontSize="xl"
        lineHeight="xl"
        mb="xxs"
        fontWeight="semibold"
      >
        Why do we need to have a call?
      </Text>
      <Text>
        Advisable offers a money-back guarantee on any freelancer we recommend
        so we want to make sure we fully understand your requirements so we can
        make a perfect recommendation.
      </Text>
    </>
  );
}

AcceptedStatus.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
};

export default AcceptedStatus;
