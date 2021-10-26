import React, { useMemo } from "react";
import { DateTime } from "luxon";
import { Badge, Box, Link, Text, theme } from "@advisable/donut";
import RecommendationAvatar from "../../Discover/components/RecommendationAvatar";
import { Calendar } from "@styled-icons/heroicons-solid";
import { Call } from "@styled-icons/ionicons-solid/Call";
import MessageAction from "./MessageAction";
import { rgba } from "polished";
import RemoveApplication from "./RemoveApplication";
import HireAction from "./HireAction";

export default function CandidateCard({ application }) {
  return (
    <Box
      bg="white"
      display="flex"
      flexDirection="column"
      borderRadius="24px"
      key={application.id}
      css={`
        box-shadow: 0 0 20px ${rgba(theme.colors.neutral900, 0.04)},
          0 2px 4px ${rgba(theme.colors.neutral900, 0.04)},
          0 4px 8px -2px ${rgba(theme.colors.neutral900, 0.04)},
          0 8px 16px -4px ${rgba(theme.colors.neutral900, 0.04)},
          0 16px 32px -8px ${rgba(theme.colors.neutral900, 0.04)},
          0 32px 64px -16px ${rgba(theme.colors.neutral900, 0.04)};
      `}
    >
      <Box flex={1}>
        <Box padding={5} display="flex" flexDirection="column">
          <Box marginBottom={3}>
            <RecommendationAvatar
              size="2xs"
              src={application.specialist.avatar}
            />
          </Box>
          <Text
            fontSize="3xl"
            fontWeight={600}
            letterSpacing="-0.03em"
            marginBottom={1}
          >
            {application.specialist.name}
          </Text>
          <Text letterSpacing="-0.012em">
            {application.specialist.location}
          </Text>
        </Box>
        <CandidateStatus application={application} />
      </Box>
      <Box borderTop="1px solid" borderColor="neutral100">
        <Box width="100%" display="grid" gridTemplateColumns="1fr 1fr 1fr">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            paddingY={4}
          >
            <HireAction application={application} />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderX="1px solid"
            borderColor="neutral100"
          >
            <MessageAction application={application} />
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            paddingY={4}
          >
            <RemoveApplication application={application} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function StatusWrapper({ children }) {
  return (
    <Box
      padding={5}
      width="100%"
      borderTop="1px solid"
      borderColor="neutral100"
    >
      {children}
    </Box>
  );
}

function ApplicationAccepted({ application }) {
  return (
    <StatusWrapper>
      <Badge variant="orange" prefix={<Call />} marginBottom={2}>
        Call requested
      </Badge>
      <Text fontSize="sm" lineHeight="20px">
        You have requested a call with {application.specialist.firstName}. We
        will let you know when they respond.
      </Text>
    </StatusWrapper>
  );
}

function InterviewScheduled({ application }) {
  const interviewDate = useMemo(() => {
    const startsAt = application.interview?.startsAt;
    if (!startsAt) return null;
    return DateTime.fromISO(startsAt).toFormat("dd MMMM yyyy 'at' HH:MMa");
  }, [application.interview]);

  return (
    <StatusWrapper>
      <Badge variant="neutral" prefix={<Calendar />} marginBottom={2}>
        Call scheduled
      </Badge>
      <Text fontSize="sm" lineHeight="20px" marginBottom={3}>
        You have a call with {application.specialist.firstName} scheduled for{" "}
        {interviewDate}.
      </Text>
      <Link
        fontSize="sm"
        variant="underlined"
        to={`/interviews/${application.interview?.id}`}
      >
        Manage interview
      </Link>
    </StatusWrapper>
  );
}

function Proposed({ application }) {
  return (
    <StatusWrapper>
      <Badge prefix={<Calendar />} marginBottom={2}>
        Sent a proposal
      </Badge>
      <Text fontSize="sm" lineHeight="20px" marginBottom={3}>
        {application.specialist.firstName} has sent you a proposal and is
        waiting for your response.
      </Text>
      <Link
        fontSize="sm"
        variant="underlined"
        to={`/hire/proposals/${application.id}`}
      >
        View proposal
      </Link>
    </StatusWrapper>
  );
}

const STATUSES = {
  "Application Accepted": ApplicationAccepted,
  "Interview Scheduled": InterviewScheduled,
  "Interview Completed": InterviewScheduled,
  Proposed,
};

function CandidateStatus({ application }) {
  const component = STATUSES[application.status];
  if (!component) return null;

  return React.createElement(component, { application });
}
