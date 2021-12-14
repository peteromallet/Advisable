import React from "react";
import { DateTime } from "luxon";
import { useParams, useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Heading, Text, Box, Button } from "@advisable/donut";
import { SCHEDULE_INTERVIEW } from "./queries";
import Event from "./Event";
import BackButton from "src/components/BackButton";

export default function ConfirmInterviewRequest() {
  const location = useLocation();
  const { datetime, interviewID } = useParams();
  const parsed = DateTime.fromISO(datetime);
  const [scheduleInterview, { loading }] = useMutation(SCHEDULE_INTERVIEW);

  const startsAt = parsed.toUTC().toISO();

  const handleSchedule = async () => {
    await scheduleInterview({
      variables: {
        input: { id: interviewID, startsAt },
      },
    });
  };

  return (
    <>
      <BackButton
        marginBottom={4}
        to={`/interview_request/${interviewID}/${parsed.toFormat(
          "yyyy-MM-dd",
        )}`}
      />
      <Heading marginBottom={2}>Confirm time</Heading>
      <Text fontSize="l" lineHeight="24px" color="neutral800" marginBottom={5}>
        Please review and confirm the selected time below.
      </Text>
      <Box marginBottom={8}>
        <Event date={parsed} zone={location.state?.zone} />
      </Box>
      <Button
        variant="gradient"
        onClick={handleSchedule}
        size="l"
        loading={loading}
      >
        Confirm Call
      </Button>
    </>
  );
}
