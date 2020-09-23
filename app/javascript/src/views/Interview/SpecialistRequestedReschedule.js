import React from "react";
import { Text, Paragraph } from "@advisable/donut";
import useViewer from "../../hooks/useViewer";
import UpdateAvailabilityForm from "./UpdateAvailabilityForm";
import { useResendInterviewRequest } from "./queries";

export default function SpecialistRequestedReschedule({ interview }) {
  const viewer = useViewer();
  const isSpecialist = viewer.isSpecialist;

  return isSpecialist ? (
    <SpecialistRequestedRescheduleAsSpecialist interview={interview} />
  ) : (
    <SpecialistRequestedRescheduleAsClient interview={interview} />
  );
}

function SpecialistRequestedRescheduleAsSpecialist({ interview }) {
  return (
    <>
      <Text fontSize="2xl" fontWeight="medium" marginBottom="xs">
        Requested to reschedule
      </Text>
      <Paragraph>
        You have requested to reschedule this interview. We have asked{" "}
        {interview.user.firstName} to update their availability and will let you
        know when they do.
      </Paragraph>
    </>
  );
}

function SpecialistRequestedRescheduleAsClient({ interview }) {
  const [resendInterviewRequest] = useResendInterviewRequest();

  const handleResendInterviewRequest = React.useCallback(async () => {
    await resendInterviewRequest({
      variables: {
        input: {
          id: interview.id,
        },
      },
    });
  }, [resendInterviewRequest, interview]);

  return (
    <>
      <Text fontSize="2xl" fontWeight="medium" marginBottom="xs">
        {interview.specialist.firstName} has requested to reschedule your
        interview.
      </Text>
      <Paragraph marginBottom="lg">
        Please update your availability below with some more options for them to
        choose from.
      </Paragraph>
      <UpdateAvailabilityForm
        interview={interview}
        onUpdate={handleResendInterviewRequest}
      />
    </>
  );
}
