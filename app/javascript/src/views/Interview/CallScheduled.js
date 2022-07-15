import React from "react";
import { DateTime } from "luxon";
import {
  Box,
  Card,
  Button,
  Text,
  theme,
  DialogDisclosure,
  useModal,
} from "@advisable/donut";
import useViewer from "../../hooks/useViewer";
import CalendarIllustration from "src/illustrations/zest/calendar";
import BackButton from "src/components/BackButton";
import CallRescheduleModal from "./CallRescheduleModal";

export default function CallScheduled({ interview }) {
  const viewer = useViewer();
  const modal = useModal();
  const isSpecialist = viewer.isSpecialist;
  const datetime = DateTime.fromISO(interview.startsAt).toFormat(
    "cccc, dd LLLL y 'at' hh:mm a",
  );
  const recipient = isSpecialist
    ? interview.user.firstName
    : interview.specialist.firstName;

  return (
    <>
      <CallRescheduleModal modal={modal} interview={interview} />
      <Box maxWidth="500px" marginX="auto" paddingY="4xl">
        <Card padding={["xl", "2xl"]} borderRadius="20px">
          <Box>
            <BackButton
              to={`/messages/${interview.conversation?.id}`}
              marginBottom={2}
            />
            <Box marginBottom="xl">
              <CalendarIllustration
                width="200px"
                color={theme.colors.blue200}
              />
              <Text fontSize="xl" lineHeight="xl">
                Your interview with {recipient} is scheduled to take place on{" "}
                {datetime}
              </Text>
            </Box>
            <Box marginBottom={4}>
              <DialogDisclosure {...modal}>
                <Button as="span" variant="dark">
                  Reschedule
                </Button>
              </DialogDisclosure>
            </Box>
          </Box>
        </Card>
      </Box>
    </>
  );
}
