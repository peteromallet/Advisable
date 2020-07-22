import React from "react";
import PropTypes from "prop-types";
import { Text, Button } from "@advisable/donut";
import {
  useRequestApplicationReminder,
  useLocationState,
  getRequestApplicationReminderOptimisticResponse,
} from "../../queries";

function NotHiringStatus({ RedirectToNextStep, RedirectToInitialStep }) {
  const locationState = useLocationState();
  const [mutation, { error, called }] = useRequestApplicationReminder();

  if (error) return <RedirectToInitialStep />;
  if (called) return <RedirectToNextStep state={{ ...locationState }} />;

  const requestApplicationReminder = () => {
    mutation({
      variables: { id: locationState.applicationId },
      optimisticResponse: getRequestApplicationReminderOptimisticResponse(
        locationState.applicationId,
      ),
    });
  };

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
      <Button onClick={requestApplicationReminder}>Remind Me</Button>
    </>
  );
}

NotHiringStatus.propTypes = {
  RedirectToInitialStep: PropTypes.elementType,
  RedirectToNextStep: PropTypes.elementType,
};

export default NotHiringStatus;
