import React, { useEffect } from "react";
import { DateTime } from "luxon";
import { Box, Text, Button, Paragraph } from "@advisable/donut";
import AvailabilityInput from "components/AvailabilityInput";
import ActionBarModal from "./ActionBarModal";
import { useAvailability, useUpdateAvailability } from "./queries";

function onlyFutureAvailability(availability) {
  const today = DateTime.local().endOf("day");
  return availability.filter((time) => {
    return today < DateTime.fromISO(time).endOf("day");
  });
}

export default function UpdateAvailability({ firstName, dialog, onUpdate }) {
  const { loading, data } = useAvailability({
    skip: !dialog.visible,
  });

  const [
    updateAvailability,
    updateAvailabilityResponse,
  ] = useUpdateAvailability();
  const [availability, setAvailability] = React.useState([]);

  useEffect(() => {
    if (!loading) {
      setAvailability(onlyFutureAvailability(data?.viewer?.availability || []));
    }
  }, [data, loading, setAvailability]);

  const handleContinue = async () => {
    await updateAvailability({
      variables: {
        input: {
          id: data.viewer.id,
          availability,
        },
      },
    });

    onUpdate();
  };

  const events = data?.viewer?.interviews?.map((i) => ({
    time: i.startsAt,
    label: `Interview with ${i.specialist.firstName}`,
  }));

  return (
    <ActionBarModal width={800} dialog={dialog} label="Update availability">
      {loading ? (
        <>loading..</>
      ) : (
        <>
          <Text
            fontSize="xxl"
            color="neutral900"
            marginBottom="8px"
            fontWeight="medium"
            letterSpacing="-0.04em"
          >
            Schedule a call with {firstName}
          </Text>
          <Paragraph size="sm" marginBottom="24px">
            Let us know what times suit you for a 30 minute call with{" "}
            {firstName}. We'll send these times to {firstName} for them to
            schedule a call.
          </Paragraph>
          <AvailabilityInput
            maxHeight="350px"
            value={availability}
            onChange={setAvailability}
            events={events}
          />
          <Box marginTop="24px">
            {availability.length >= 6 ? (
              <Button
                variant="dark"
                onClick={handleContinue}
                loading={updateAvailabilityResponse.loading}
              >
                Request Call
              </Button>
            ) : (
              <Text fontSize="15px" color="neutral700">
                Please select at least 6 available times
              </Text>
            )}
          </Box>
        </>
      )}
    </ActionBarModal>
  );
}
