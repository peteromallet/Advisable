import React from "react";
import { get } from "lodash";
import { Link } from "react-router-dom";
import { Button } from "@advisable/donut";

// Renders all of the available actions in the messages sidebar when viewed
// by the specialist.
const ClientActions = ({ application }) => {
  const actions = [];

  if (application.status === "Applied") {
    actions.push(
      <Button
        as={Link}
        width="100%"
        intent="success"
        key="updateApplication"
        appearance="primary"
        to={`/invites/${application.airtableId}/apply`}
      >
        Update Application
      </Button>
    );
  }

  if (application.status === "Proposed") {
    actions.push(
      <Button
        as={Link}
        width="100%"
        intent="success"
        key="updateProposal"
        appearance="primary"
        to={`/applications/${application.airtableId}/proposal`}
      >
        Update Proposal
      </Button>
    );
  }

  if (application.status === "Application Accepted") {
    if (get(application, "interview.status") === "Call Completed") {
      actions.push(
        <Button
          as={Link}
          width="100%"
          intent="success"
          key="sendProposal"
          appearance="primary"
          to={`/applications/${application.airtableId}/proposal`}
        >
          Send Proposal
        </Button>
      );
    }

    if (get(application, "interview.status") === "Call Requested") {
      actions.push(
        <Button
          as={Link}
          width="100%"
          intent="success"
          appearance="primary"
          key="scheduleInterview"
          to={`/interview_request/${application.interview.airtableId}`}
        >
          Schedule Interview
        </Button>
      );
    }
  }

  return actions;
};

export default ClientActions;
