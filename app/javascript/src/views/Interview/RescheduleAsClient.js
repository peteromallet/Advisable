import React from "react";
import { Box, Text, Paragraph } from "@advisable/donut";
import UpdateAvailablityForm from "./UpdateAvailabilityForm";
import { useRequestInterviewReschedule } from "./queries";

export default function RequestRescheduleAsClient({ interview }) {
  const [requestRequest] = useRequestInterviewReschedule();

  return (
    <Box padding="xl">
      <Box maxWidth="350px">
        <Text
          fontSize="3xl"
          marginBottom="xs"
          fontWeight="medium"
          letterSpacing="-0.02em"
        >
          Reschedule your interview with {interview.specialist.firstName}
        </Text>
      </Box>
      <Paragraph marginBottom="xl">
        Update your availability below and we will notify{" "}
        {interview.specialist.firstName} to reschdule the interview.
      </Paragraph>
      <UpdateAvailablityForm buttonLabel="Request To Reschedule" />
    </Box>
  );
}
