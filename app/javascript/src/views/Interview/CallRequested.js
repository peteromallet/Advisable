import { Redirect } from "react-router-dom";
import { Box, Card, Text, Paragraph } from "@advisable/donut";
import useViewer from "../../hooks/useViewer";

export default function CallRequested({ interview }) {
  const { id } = interview;
  const { isSpecialist } = useViewer();

  if (isSpecialist) {
    return <Redirect to={`/interview_request/${id}`} />;
  }

  return (
    <Box maxWidth="500px" marginX="auto" paddingY="xl">
      <Card padding={["xl", "2xl"]}>
        <Text
          fontSize="3xl"
          fontWeight="medium"
          color="neutral900"
          letterSpacing="-0.02em"
          marginBottom="sm"
        >
          You have requested a call with {interview.specialist.firstName}
        </Text>
        <Paragraph>
          We have sent your availability to {interview.specialist.firstName}. We
          will let you know once they have scheduled a call for one of these
          times.
        </Paragraph>
      </Card>
    </Box>
  );
}
