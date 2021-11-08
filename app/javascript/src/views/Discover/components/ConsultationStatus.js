import React from "react";
import { DateTime } from "luxon";
import { Box, Text, Circle, Button } from "@advisable/donut";
import { Link } from "react-router-dom";
import { ArrowRight, ChatAlt } from "@styled-icons/heroicons-solid";

function StatusNotice({ path, actionLabel, title, children }) {
  const handleClick = (e) => {
    if (path) e.stopPropagation();
  };

  return (
    <Box
      width="100%"
      bg="neutral100"
      padding={4}
      borderRadius="20px"
      marginTop="-4px"
      marginBottom={6}
      display="flex"
      alignItems="center"
    >
      <Circle
        flexShrink={0}
        size={32}
        bg="neutral400"
        color="white"
        marginRight={3}
      >
        <ChatAlt size={20} />
      </Circle>
      <Box flex={1}>
        <Text
          fontSize="17px"
          color="neutral900"
          fontWeight={560}
          marginBottom={0.5}
        >
          {title}
        </Text>
        <Text color="neutral800" lineHeight="20px">
          {children}
        </Text>
      </Box>
      {path && (
        <Box flexShrink={0}>
          <Link to={path} onClick={handleClick}>
            <Button variant="gradient" size="s" suffix={<ArrowRight />}>
              {actionLabel}
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  );
}

function ConsultationRequestSent({ specialist }) {
  return (
    <StatusNotice
      title={`You have requested a consultation with ${specialist.firstName}`}
    >
      We will let you know when they respond.
    </StatusNotice>
  );
}

function ConsultationRequestRejected({ specialist }) {
  return (
    <StatusNotice title="Consultation request declined">
      {specialist.firstName} has declined your consultation request.
    </StatusNotice>
  );
}

function InterviewScheduled({ specialist }) {
  const datetime = DateTime.fromISO(
    specialist.consultation.interview.startsAt,
  ).toFormat("cccc, dd LLLL y 'at' hh:mm a");
  return (
    <StatusNotice
      title={`${specialist.firstName} has accepted your consultation request`}
    >
      Your call is scheduled for {datetime}
    </StatusNotice>
  );
}

function NeedMoreTimeOptions({ specialist }) {
  return (
    <StatusNotice
      actionLabel="Update"
      path={`/interviews/${specialist.consultation.interview.id}`}
      title={`${specialist.firstName} has requested more time options`}
    >
      {specialist.firstName} has accepted your request, however, none of your
      available times work for them. Please update your availability to schedule
      your call.
    </StatusNotice>
  );
}

function SpecialistRequestedReschedule({ specialist }) {
  return (
    <StatusNotice
      actionLabel="Reschedule"
      path={`/interviews/${specialist.consultation.interview.id}`}
      title={`${specialist.firstName} has requested to reschedule your call`}
    >
      Please update your availability to reschedule your call.
    </StatusNotice>
  );
}

const INTERVIEW_STATUSES = {
  "Call Requested": ConsultationRequestSent,
  "Call Scheduled": InterviewScheduled,
  "Call Completed": InterviewScheduled,
  "Need More Time Options": NeedMoreTimeOptions,
  "More Time Options Added": ConsultationRequestSent,
  "Specialist Requested Reschedule": SpecialistRequestedReschedule,
  "Client Requested Reschedule": ConsultationRequestSent,
};

function InterviewStatus({ specialist }) {
  const component =
    INTERVIEW_STATUSES[specialist.consultation.interview.status];
  if (!component) return null;

  return React.createElement(component, { specialist });
}

const CONSULTATION_STATUSES = {
  "Request Completed": ConsultationRequestSent,
  "Accepted By Specialist": InterviewStatus,
  "Specialist Rejected": ConsultationRequestRejected,
};

export default function ConsultationStatus({ specialist }) {
  const component = CONSULTATION_STATUSES[specialist.consultation.status];
  if (!component) return null;

  return React.createElement(component, { specialist });
}
