import React, { useMemo } from "react";
import { DateTime } from "luxon";
import { Badge, Box, Text } from "@advisable/donut";
import RecommendationAvatar from "../../Discover/components/RecommendationAvatar";
import CircularButton from "src/components/CircularButton";
import {
  BadgeCheck,
  Calendar,
  ChatAlt,
  Trash,
} from "@styled-icons/heroicons-solid";
import { useHistory } from "react-router";
import { Call } from "@styled-icons/ionicons-solid/Call";

export default function CandidateCard({ application }) {
  const history = useHistory();

  const handleHire = () => {
    history.push(`/book/${application.id}`);
  };

  return (
    <Box
      bg="white"
      boxShadow="s"
      display="flex"
      flexDirection="column"
      borderRadius="24px"
      key={application.id}
    >
      <Box padding={5} display="flex" flexDirection="column">
        <Box marginBottom={4}>
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
        <Text letterSpacing="-0.012em">{application.specialist.location}</Text>
      </Box>
      <CandidateStatus application={application} />
      <Box width="100%" display="grid" gridTemplateColumns="1fr 1fr 1fr">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingY={4}
        >
          <CircularButton
            size="sm"
            icon={<BadgeCheck />}
            label="Hire"
            onClick={handleHire}
            bg="blue100"
            color="blue800"
          />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderX="1px solid"
          borderColor="neutral100"
        >
          <CircularButton size="sm" icon={<ChatAlt />} label="Message" />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingY={4}
        >
          <CircularButton size="sm" icon={<Trash />} label="Remove" />
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
      borderBottom="1px solid"
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
      <Text fontSize="sm" lineHeight="20px">
        You have a call with {application.specialist.firstName} scheduled for{" "}
        {interviewDate}.
      </Text>
    </StatusWrapper>
  );
}

function Proposed({ application }) {
  return (
    <StatusWrapper>
      <Badge prefix={<Calendar />} marginBottom={2}>
        Sent a proposal
      </Badge>
      <Text fontSize="sm" lineHeight="20px">
        {application.specialist.firstName} has sent you a proposal and is
        waiting for your response.
      </Text>
    </StatusWrapper>
  );
}

const STATUSES = {
  "Application Accepted": ApplicationAccepted,
  "Interview Scheduled": InterviewScheduled,
  Proposed,
};

function CandidateStatus({ application }) {
  const component = STATUSES[application.status];
  if (!component) return null;

  return React.createElement(component, { application });
}
