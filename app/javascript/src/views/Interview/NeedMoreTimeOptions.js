import React from "react";
import { Text, Paragraph } from "@advisable/donut";
import useViewer from "../../hooks/useViewer";
import UpdateAvailabilityForm from "./UpdateAvailabilityForm";
import { useResendInterviewRequest } from "./queries";

export default function NeedMoreTimeOptions({ interview }) {
  const viewer = useViewer();
  const isSpecialist = viewer.isSpecialist;

  return isSpecialist ? (
    <NeedMoreTimeOptionsAsSpecialist interview={interview} />
  ) : (
    <NeedMoreTimeOptionsAsClient interview={interview} />
  );
}

function NeedMoreTimeOptionsAsSpecialist({ interview }) {
  return (
    <>
      <Text fontSize="2xl" fontWeight="medium" marginBottom="xs">
        You have requested more time options from {interview.user.firstName}
      </Text>
      <Paragraph marginBottom="lg">
        We have asked {interview.user.firstName} to updated their availability
        with more time options and will let you know once they have.
      </Paragraph>
    </>
  );
}

function NeedMoreTimeOptionsAsClient({ interview }) {
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
        {interview.specialist.firstName} has requested more time options for
        this interview
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
