import { useCallback } from "react";
import { Container, Card, Box, Text, Paragraph } from "@advisable/donut";
import UpdateAvailablityForm from "./UpdateAvailabilityForm";
import { useRequestInterviewReschedule } from "./queries";

export default function RequestRescheduleAsClient({ interview }) {
  const [requestReschedule] = useRequestInterviewReschedule();

  const handleRequest = useCallback(async () => {
    await requestReschedule({
      variables: {
        input: {
          interview: interview.id,
        },
      },
    });
  }, [requestReschedule, interview]);

  return (
    <Container paddingY="xl">
      <Card padding={["xl", "2xl"]}>
        <Text
          fontSize="4xl"
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
          buttonLabel="Request To Reschedule"
        />
      </Card>
    </Container>
  );
}
