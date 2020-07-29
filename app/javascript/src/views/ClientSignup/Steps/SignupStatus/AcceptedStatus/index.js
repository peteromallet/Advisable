import React, { useCallback } from "react";
import PropTypes from "prop-types";
import {
  Text,
  Box,
  useModal,
  Button,
  DialogDisclosure,
} from "@advisable/donut";
import RequestCallButton from "../RequestCallButton";
import {
  useLocationState,
  useRequestApplicationCallback,
} from "../../../queries";
import { Redirect } from "react-router";
import PhoneModal from "./PhoneModal";
import MotionStack from "../../MotionStack";
import { Title, Description } from "../../styles";

function AcceptedStatus({ firstName, lastName }) {
  const [
    requestApplicationCallback,
    { data, called },
  ] = useRequestApplicationCallback();
  const fullName = `${firstName} ${lastName}`;
  const { email, applicationId } = useLocationState();
  const modal = useModal();

  const Navigation = useCallback(() => {
    if (data)
      return <Redirect push to="/clients/signup/thank-you-call-you-shortly" />;
    return null;
  }, [data]);

  return (
    <>
      <Navigation />
      <MotionStack>
        <Title mb="m">Let’s get started!</Title>
        <Description color="neutral500">
          The final step before being able to access Advisable’s elite pool of
          talent is a ~10-minute with one of our team. On this call, we’ll ask
          you a couple of clarification questions to ensure that you’re a good
          fit for Advisable, give you an overview of how Advisable works and
          make you aware of the expectations for you as a client when dealing
          with our freelancers.
        </Description>
        <Box mb="l" display="flex" flexDirection={["column", "row"]}>
          <RequestCallButton
            mr={[null, "s"]}
            mb={["s", "auto"]}
            fullName={fullName}
            email={email}
            id={applicationId}
          >
            Schedule A Call
          </RequestCallButton>
          <DialogDisclosure
            as={Button}
            loading={called}
            variant="subtle"
            {...modal}
          >
            Call Me ASAP
          </DialogDisclosure>
          <PhoneModal
            requestApplicationCallback={requestApplicationCallback}
            modal={modal}
          />
        </Box>
        <Text
          as="h4"
          fontSize="xl"
          lineHeight="xl"
          mb="xs"
          fontWeight="semibold"
          color="blue900"
        >
          Why do we need to have a call?
        </Text>
        <Description>
          Advisable offers a money-back guarantee on any freelancer we recommend
          so we want to make sure we fully understand your requirements so we
          can make a perfect recommendation.
        </Description>
      </MotionStack>
    </>
  );
}

AcceptedStatus.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
};

export default AcceptedStatus;
