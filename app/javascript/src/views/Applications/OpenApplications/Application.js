import * as React from "react";
import { DateTime } from "luxon";
import { Info } from "@styled-icons/feather/Info";
import { Box, Text, Link, Card } from "@advisable/donut";
import ApplicationStatus from "../../../components/ApplicationStatus";
import { Notice } from "./styles";

const INFORMATION = {
  Applied: function ApplicationApplied({ application }) {
    return (
      <React.Fragment>
        <Text size="s" mb="xs">
          Your application has submitted. We will let you know when you get a
          response.
        </Text>
        <Link target="_blank" to={`/invites/${application.id}/apply`}>
          Update Application
        </Link>
      </React.Fragment>
    );
  },
  Proposed: function ApplicationProposed({ application }) {
    return (
      <React.Fragment>
        <Text size="s">
          Your proposal has been sent to {application.project.user.companyName}.
          We will let you know when they respond.
        </Text>
        <Link target="_blank" to={`/applications/${application.id}/proposal`}>
          Update Proposal
        </Link>
      </React.Fragment>
    );
  },
  "Application Accepted": function ApplicationAccepted({ application }) {
    const { interview } = application;

    if (interview && interview.status === "Call Completed") {
      return (
        <React.Fragment>
          <Text size="s">
            Your interview with {application.project.user.companyName} has been
            complete. We will let you know when they respond. In the mean time
            you can send them a proposal.
          </Text>
          <Link target="_blank" to={`/applications/${application.id}/proposal`}>
            Send Proposal
          </Link>
        </React.Fragment>
      );
    }

    if (interview && interview.status === "Call Requested") {
      return (
        <React.Fragment>
          <Text size="s">
            {application.project.user.companyName} has requested an interview
            with you
          </Text>
          <Link target="_blank" to={`/interview_request/${interview.id}`}>
            Schedule Interview
          </Link>
        </React.Fragment>
      );
    }

    if (interview && interview.status === "Call Scheduled") {
      return (
        <React.Fragment>
          <Text size="s">
            Your interview with {application.project.user.companyName} has been
            scheduled for{" "}
            <Text weight="semibold" as="span" inline>
              {DateTime.fromISO(interview.startsAt, {
                zone: interview.timeZone,
              }).toFormat("cccc, dd MMMM' at 'hh:mm a")}
            </Text>
          </Text>
        </React.Fragment>
      );
    }

    return null;
  },
};

const Application = ({ application }) => {
  const InfoComponent = INFORMATION[application.status];
  const { project } = application;

  return (
    <Card padding={6} borderRadius="12px" position="relative">
      <Text fontSize="xl" fontWeight="medium" colour="neutral900">
        {application.project.primarySkill?.name}
      </Text>
      <Text mt={1} fontSize="sm" color="neutral800">
        <Text as="span">
          {project.industry} {project.companyType}
        </Text>
        <Box as="span" px={2}>
          &bull;
        </Box>
        <Text as="span">
          Applied {DateTime.fromISO(application.appliedAt).toRelative()}
        </Text>
      </Text>
      <Box position="absolute" top="24px" right="24px">
        <ApplicationStatus>{application.status}</ApplicationStatus>
      </Box>
      {InfoComponent && (
        <Box paddingTop="m">
          <Notice>
            <Info size={24} strokeWidth={2} />
            <InfoComponent application={application} />
          </Notice>
        </Box>
      )}
    </Card>
  );
};

export default Application;
