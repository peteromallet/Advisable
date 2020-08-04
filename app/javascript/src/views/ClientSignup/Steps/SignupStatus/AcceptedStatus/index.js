import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { Box, useModal, Button, DialogDisclosure } from "@advisable/donut";
import RequestCallButton from "../RequestCallButton";
import {
  useLocationState,
  useRequestApplicationCallback,
  useCoutryCode,
} from "../../../queries";
import { Redirect } from "react-router";
import PhoneModal from "./PhoneModal";
import MotionStack from "../../MotionStack";
import { Title, Description, BulletListItem } from "../../styles";
import { Eye, Smile, Coffee } from "@styled-icons/feather";

function AcceptedStatus({ firstName, lastName }) {
  const [
    requestApplicationCallback,
    { data: callback, called },
  ] = useRequestApplicationCallback();
  const { data } = useCoutryCode();
  const countryCode = data?.clientApplication?.country?.code;
  const fullName = `${firstName} ${lastName}`;
  const { email, applicationId } = useLocationState();
  const modal = useModal();

  const Navigation = useCallback(() => {
    if (callback)
      return <Redirect push to="/clients/signup/thank-you-call-you-shortly" />;
    return null;
  }, [callback]);

  return (
    <>
      <Navigation />
      <MotionStack>
        <Title mb="m">Let’s get started!</Title>
        <Description mb="s">
          The final step before being able to access Advisable’s elite pool of
          talent is a ~10-minute call with us to:
        </Description>
        <BulletListItem
          text="Give you an overview of how Advisable works & how to get the most from our talent"
          Icon={Eye}
        />
        <BulletListItem
          text="Ask you a couple of clarification questions to ensure that you’re a
            good fit for Advisable"
          Icon={Coffee}
        />
        <BulletListItem
          text="Make you aware of the expectations for you as a client when dealing
            with our freelancers"
          Icon={Smile}
          mb="l"
        />
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
            countryCode={countryCode}
            modal={modal}
          />
        </Box>
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
