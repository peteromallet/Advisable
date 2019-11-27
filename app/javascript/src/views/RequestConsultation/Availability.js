import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Icon, Box, Text, RoundedButton } from "@advisable/donut";
import AvailabilityInput from "../../components/Availability";

const Availability = ({ data, nextStep }) => {
  const history = useHistory();
  const location = useLocation();
  const specialist = data.specialist;

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
        Select the times you will be availabile for a consultation with{" "}
        {specialist.name}. The more times you select, the easier it'll be for us
        to find a time that suits them.
      </Text>
      <Box height={300}>
        <AvailabilityInput
          selected={selectedAvailability}
          onSelect={handleAvailabilityChange}
        />
      </Box>
      {selectedAvailability.length < 6 && (
        <Box
          p="xs"
          mt="xs"
          fontSize="s"
          bg="neutral.0"
          display="flex"
          borderRadius={8}
          color="neutral.7"
          alignItems="center"
        >
          <Icon icon="info" width={20} color="neutral.6" mr="xs" />
          Please select at least 3 available times
        </Box>
      )}
      <RoundedButton
        mt="xl"
        onClick={nextStep}
        width={["100%", "auto"]}
        suffix={<Icon icon="arrow-right" />}
        disabled={selectedAvailability.length < 6}
      >
        Continue
      </RoundedButton>
    </>
  );
};

export default Availability;
