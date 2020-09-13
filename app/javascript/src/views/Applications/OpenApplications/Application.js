import * as React from "react";
import { DateTime } from "luxon";
import { Info } from "@styled-icons/feather";
import { Box, Text, Link } from "@advisable/donut";
import ApplicationStatus from "../../../components/ApplicationStatus";
import { Card, Notice } from "./styles";

const INFORMATION = {
  Applied: function ApplicationApplied({ application }) {
    return (
      <React.Fragment>
        <Text size="s" mb="xs">
          Your application has submitted. We will let you know when you get a
          response.
        </Text>
        <Link target="_blank" to={`/invites/${application.airtableId}/apply`}>
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
        <Link
          target="_blank"
          to={`/applications/${application.airtableId}/proposal`}
        >
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
          <Link
            target="_blank"
            to={`/applications/${application.airtableId}/proposal`}
          >
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
          <Link
            target="_blank"
            to={`/interview_request/${interview.airtableId}`}
          >
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
    <Card elevation="m">
      <Box padding="m">
        <Text weight="semibold" colour="blue900">
          {application.project.primarySkill?.name}
        </Text>
        {(project.industry || project.companyType) && (
          <Text mt="xxs" fontSize="xs" color="neutral700">
            {project.industry} {project.companyType}
          </Text>
        )}
        <Text size="xxs" color="neutral600" mt="xs">
          {application.appliedAt && (
            <span>
              Applied {DateTime.fromISO(application.appliedAt).toRelative()}
            </span>
          )}
          {!application.appliedAt && "-"}
        </Text>
        <ApplicationStatus>{application.status}</ApplicationStatus>
        {InfoComponent && (
          <Box paddingTop="m">
            <Notice>
              <Info size={24} strokeWidth={2} />
              <InfoComponent application={application} />
            </Notice>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default Application;
