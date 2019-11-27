import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Icon, Box, Text, RoundedButton } from "@advisable/donut";
import AvailabilityInput from "../../components/Availability";

const Availability = ({ data, nextStep }) => {
  const history = useHistory();
  const location = useLocation();

  const handleAvailabilityChange = availability => {
    history.replace({
      ...location,
      state: {
        ...location.state,
        availability,
      },
    });
  };

  const selectedAvailability = location.state?.availability || [];

  return (
    <>
      <Text fontSize="s" fontWeight="medium" mb="xs" color="neutral.5">
        Step 3
      </Text>
      <Text
        mb="xs"
        as="h2"
        fontSize="xxl"
        fontWeight="semibold"
        color="blue.8"
        letterSpacing="-0.025em"
      >
        Availability
      </Text>
      <Text color="neutral.8" lineHeight="s" mb="l">
        This is some sub text to support the required action for this step. For
        aesthetic reasons it should span more than one line.
      </Text>
      <Box height={300} mb="l">
        <AvailabilityInput
          selected={selectedAvailability}
          onSelect={handleAvailabilityChange}
        />
      </Box>
      <RoundedButton
        onClick={nextStep}
        width={["100%", "auto"]}
        suffix={<Icon icon="arrow-right" />}
        disabled={selectedAvailability.length === 0}
      >
        Continue
      </RoundedButton>
    </>
  );
};

export default Availability;
