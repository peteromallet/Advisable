import React, { useEffect } from "react";
import { DateTime } from "luxon";
import {
  Box,
  Text,
  Button,
  Paragraph,
  Availability,
  useBreakpoint,
} from "@advisable/donut";
import AvailabilityInput from "components/AvailabilityInput";
import ActionBarModal from "./ActionBarModal";
import { useAvailability, useRequestIntroduction } from "./queries";

function onlyFutureAvailability(availability) {
  const today = DateTime.local().endOf("day");
  return availability.filter((time) => {
    return today < DateTime.fromISO(time).endOf("day");
  });
}

export default function UpdateAvailability({ application, dialog, onUpdate }) {
  const isLargerScreen = useBreakpoint("lUp");
  const { loading, data } = useAvailability({
    skip: !dialog.visible,
  });

  const firstName = application?.specialist.firstName;

  const [requestIntro, requestIntroResponse] = useRequestIntroduction(
    application,
    {
      update: onUpdate,
    },
  );
  const [availability, setAvailability] = React.useState([]);

  useEffect(() => {
    if (!loading) {
      setAvailability(onlyFutureAvailability(data?.viewer?.availability || []));
    }
  }, [data, loading, setAvailability]);

  const handleContinue = async () => {
    await requestIntro({
      variables: {
        input: {
          application: application.id,
          availability,
        },
      },
    });
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
            fontSize="3xl"
            color="neutral900"
            marginBottom="4px"
            fontWeight="medium"
            letterSpacing="-0.04em"
          >
            Schedule a call with {firstName}
          </Text>
          <Paragraph marginBottom="24px">
            Let us know what times suit you for a 30 minute call with{" "}
            {firstName}. We'll send these times to {firstName} for them to
            schedule a call.
          </Paragraph>
          {isLargerScreen ? (
            <AvailabilityInput
              maxHeight="350px"
              value={availability}
              onChange={setAvailability}
              events={events}
            />
          ) : (
            <Availability
              value={availability}
              onChange={setAvailability}
              events={events}
            />
          )}
          <Box marginTop="24px">
            {availability.length >= 6 ? (
              <Button
                variant="dark"
                onClick={handleContinue}
                loading={requestIntroResponse.loading}
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
