import React from "react";
import { Container, Box, Card, Text, Paragraph } from "@advisable/donut";
import useViewer from "../../hooks/useViewer";
import { useNotifications } from "components/Notifications";
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
    <Box maxWidth="500px" marginX="auto" paddingY="xl">
      <Card padding={["xl", "2xl"]}>
        <Text fontSize="2xl" fontWeight="medium" marginBottom="xs">
          Requested to reschedule
        </Text>
        <Paragraph>
          You have requested to reschedule your call with{" "}
          {interview.user.firstName}. We have asked {interview.user.firstName}{" "}
          to update their availability and will let you know when they do.
        </Paragraph>
      </Card>
    </Box>
  );
}

function SpecialistRequestedRescheduleAsClient({ interview }) {
  const notifications = useNotifications();
  const [resendInterviewRequest] = useResendInterviewRequest();

  const handleResendInterviewRequest = React.useCallback(async () => {
    await resendInterviewRequest({
      variables: {
        input: {
          id: interview.id,
        },
      },
    });

    notifications.notify(
      `We have sent your updated availability to ${interview.specialist.firstName}`,
    );
  }, [notifications, resendInterviewRequest, interview]);

  return (
    <Container paddingY="xl">
      <Card padding={["xl", "2xl"]}>
        <Text fontSize="4xl" fontWeight="medium" marginBottom="xs">
          {interview.specialist.firstName} has requested to reschedule your
          interview.
        </Text>
        <Paragraph marginBottom="lg">
          Please update your availability below with some more options for them
          to choose from.
        </Paragraph>
        <UpdateAvailabilityForm
          interview={interview}
          onUpdate={handleResendInterviewRequest}
        />
      </Card>
    </Container>
  );
}
