import React from "react";
import { Container, Box, Card, Text, Paragraph } from "@advisable/donut";
import useViewer from "../../hooks/useViewer";
import UpdateAvailabilityForm from "./UpdateAvailabilityForm";
import { useNotifications } from "components/Notifications";
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
    <Box maxWidth="500px" marginX="auto" paddingY="xl">
      <Card padding="xl">
        <Text fontSize="3xl" fontWeight="medium" marginBottom="xs">
          You have requested more time options from {interview.user.firstName}
        </Text>
        <Paragraph>
          We have asked {interview.user.firstName} to updated their availability
          with more time options and will let you know once they have.
        </Paragraph>
      </Card>
    </Box>
  );
}

function NeedMoreTimeOptionsAsClient({ interview }) {
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
  }, [resendInterviewRequest, interview]);

  return (
    <Container paddingY="xl">
      <Card padding={["xl", "2xl"]}>
        <Text fontSize="4xl" fontWeight="medium" marginBottom="xs">
          {interview.specialist.firstName} has requested more time options for
          this interview
        </Text>
        <Paragraph size="lg" marginBottom="xl">
          Please update your availability below with some more options for them
          to choose from.
        </Paragraph>
        <UpdateAvailabilityForm onUpdate={handleResendInterviewRequest} />
      </Card>
    </Container>
  );
}
