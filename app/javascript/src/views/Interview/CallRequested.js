import React from "react";
import { Navigate } from "react-router-dom";
import { theme, Box, Card, Text, Paragraph } from "@advisable/donut";
import CalendarIllustration from "src/illustrations/zest/calendar";
import BackButton from "src/components/BackButton";
import InviteToInterview from "./InviteToInterview";

export default function CallRequested({ interview }) {
  const { id, requestedBy, accounts, conversation } = interview;

  if (!requestedBy.isViewer) {
    return <Navigate replace to={`/interview_request/${id}`} />;
  }

  const other = accounts.find((p) => !p.isViewer);

  return (
    <Box maxWidth="500px" marginX="auto" paddingY="xl">
      <Card padding={["xl", "2xl"]}>
        <Box marginBottom={2}>
          <BackButton to={`/messages/${conversation.id}`} />
        </Box>
        <CalendarIllustration width="200px" color={theme.colors.blue200} />
        <Text
          fontSize="3xl"
          fontWeight="medium"
          color="neutral900"
          letterSpacing="-0.02em"
          marginBottom="sm"
        >
          You have requested a call with {other.firstName}
        </Text>
        <Paragraph>
          We have sent your availability to {other.firstName}. We will let you
          know once they have scheduled a call for one of these times.
        </Paragraph>

        <InviteToInterview interview={interview} />
      </Card>
    </Box>
  );
}
