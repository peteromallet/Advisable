import React from "react";
import { Link } from "react-router-dom";
import { Stack, Button } from "@advisable/donut";
import ReportUnresponsive from "./ReportUnresponsive";

// Renders all of the available actions in the messages sidebar when viewed
// by the specialist.
const ClientActions = ({ application }) => {
  const actions = [];

  if (application.status === "Applied") {
    actions.push(
      <Button
        as={Link}
        width="100%"
        key="updateApplication"
        to={`/invites/${application.id}/apply`}
      >
        Update Application
      </Button>,
    );
  }

  if (application.status === "Proposed") {
    actions.push(
      <Button
        as={Link}
        width="100%"
        key="updateProposal"
        to={`/applications/${application.id}/proposal`}
      >
        Update Proposal
      </Button>,
    );
  }

  if (application.status === "Application Accepted") {
    if (application?.interview?.status === "Call Completed") {
      actions.push(
        <Button
          as={Link}
          width="100%"
          key="sendProposal"
          to={`/applications/${application.id}/proposal`}
        >
          Send Proposal
        </Button>,
      );
    }

    if (application?.interview?.status === "Call Requested") {
      actions.push(
        <Button
          as={Link}
          width="100%"
          key="scheduleInterview"
          to={`/interview_request/${application.interview.id}`}
        >
          Schedule Interview
        </Button>,
      );
    }
  }

  actions.push(
    <ReportUnresponsive
      asClient={false}
      key="reportUnresponsive"
      application={application}
    />,
  );

  return <Stack spacing="sm">{actions}</Stack>;
};

export default ClientActions;
