import React from "react";
import { get } from "lodash-es";
import { Link } from "react-router-dom";
import { RoundedButton } from "@advisable/donut";

// Renders all of the available actions in the messages sidebar when viewed
// by the specialist.
const ClientActions = ({ application }) => {
  const actions = [];

  if (application.status === "Applied") {
    actions.push(
      <RoundedButton
        as={Link}
        width="100%"
        key="updateApplication"
        to={`/invites/${application.airtableId}/apply`}
      >
        Update Application
      </RoundedButton>,
    );
  }

  if (application.status === "Proposed") {
    actions.push(
      <RoundedButton
        as={Link}
        width="100%"
        key="updateProposal"
        to={`/applications/${application.airtableId}/proposal`}
      >
        Update Proposal
      </RoundedButton>,
    );
  }

  if (application.status === "Application Accepted") {
    if (get(application, "interview.status") === "Call Completed") {
      actions.push(
        <RoundedButton
          as={Link}
          width="100%"
          key="sendProposal"
          to={`/applications/${application.airtableId}/proposal`}
        >
          Send Proposal
        </RoundedButton>,
      );
    }

    if (get(application, "interview.status") === "Call Requested") {
      actions.push(
        <RoundedButton
          as={Link}
          width="100%"
          key="scheduleInterview"
          to={`/interview_request/${application.interview.airtableId}`}
        >
          Schedule Interview
        </RoundedButton>,
      );
    }
  }

  return actions;
};

export default ClientActions;
