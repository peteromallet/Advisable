import { get } from "lodash-es";
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
        key="updateApplication"
        to={`/invites/${application.airtableId}/apply`}
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
        to={`/applications/${application.airtableId}/proposal`}
      >
        Update Proposal
      </Button>,
    );
  }

  if (application.status === "Application Accepted") {
    if (get(application, "interview.status") === "Call Completed") {
      actions.push(
        <Button
          as={Link}
          width="100%"
          key="sendProposal"
          to={`/applications/${application.airtableId}/proposal`}
        >
          Send Proposal
        </Button>,
      );
    }

    if (get(application, "interview.status") === "Call Requested") {
      actions.push(
        <Button
          as={Link}
          width="100%"
          key="scheduleInterview"
          to={`/interview_request/${application.interview.airtableId}`}
        >
          Schedule Interview
        </Button>,
      );
    }
  }

  return actions;
};

export default ClientActions;
