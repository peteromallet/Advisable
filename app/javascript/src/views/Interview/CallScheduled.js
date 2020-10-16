import { DateTime } from "luxon";
import { Link } from "react-router-dom";
import { Calendar } from "@styled-icons/ionicons-outline";
import { Circle, Box, Card, Button, Text } from "@advisable/donut";
import useViewer from "../../hooks/useViewer";

export default function CallScheduled({ interview }) {
  const viewer = useViewer();
  const isSpecialist = viewer.isSpecialist;
  const datetime = DateTime.fromISO(interview.startsAt).toFormat(
    "cccc, dd LLLL y 'at' hh:mm a",
  );
  const recipient = isSpecialist
    ? interview.user.firstName
    : interview.specialist.firstName;

  return (
    <Box maxWidth="500px" marginX="auto" paddingY="4xl">
      <Card padding={["xl", "2xl"]}>
        <Box textAlign="center">
          <Box marginBottom="xl">
            <Circle size={64} bg="neutral100" marginBottom="lg">
              <Calendar size={24} />
            </Circle>
            <Text fontSize="xl" lineHeight="xl">
              Your interview with {recipient} is scheduled to take place on{" "}
              {datetime}
            </Text>
          </Box>
          <Link to={`/interviews/${interview.id}/reschedule`}>
            <Button as="span" variant="dark">
              Request To Reschedule
            </Button>
          </Link>
        </Box>
      </Card>
    </Box>
  );
}
