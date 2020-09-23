import React from "react";
import { Box, Text, Paragraph } from "@advisable/donut";
import UpdateAvailablityForm from "./UpdateAvailabilityForm";
import { useRequestInterviewReschedule } from "./queries";

export default function RequestRescheduleAsClient({ interview }) {
  const [requestReschedule] = useRequestInterviewReschedule();

  const handleRequest = React.useCallback(async () => {
    await requestReschedule({
      variables: {
        input: {
          interview: interview.id,
        },
      },
    });
  }, [requestReschedule, interview]);

  return (
    <Box padding="xl">
      <Text
        fontSize="3xl"
        marginBottom="xs"
        fontWeight="medium"
        letterSpacing="-0.02em"
      >
        Reschedule your interview with {interview.specialist.firstName}
      </Text>
      <Paragraph marginBottom="xl">
        Update your availability below and we will notify{" "}
        {interview.specialist.firstName} to reschdule the interview.
      </Paragraph>
      <UpdateAvailablityForm
        interview={interview}
        onUpdate={handleRequest}
        buttonLabel="Reschedule"
      />
    </Box>
  );
}
