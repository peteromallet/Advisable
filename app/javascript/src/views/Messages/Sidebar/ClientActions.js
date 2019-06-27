import React from "react";
import { Link } from "react-router-dom";
import { Padding, Button } from "@advisable/donut";
import CreateBookingButton from "../../../components/CreateBookingButton";
import DeclineApplicationButton from "../../../components/DeclineApplicationButton";

// Renders all of the available actions in the messages sidebar when viewed
// by the client.
const ClientActions = ({ application }) => {
  const actions = [];
  const isBooking = application.status === "Working";

  // Show an action to begin working with the specialist if the application is
  // in an accepted state.
  if (!isBooking && application.status === "Application Accepted") {
    actions.push(
      <Padding bottom="xs" key="createBooking">
        <CreateBookingButton application={application} />
      </Padding>
    );
  }

  if (!isBooking && application.status === "Proposed") {
    actions.push(
      <Padding bottom="xs" key="viewProposal">
        <Button
          as={Link}
          width="100%"
          intent="success"
          icon="file-text"
          appearance="primary"
          to={`/projects/${application.project.airtableId}/applications/${
            application.airtableId
          }/proposal`}
        >
          View Proposal
        </Button>
      </Padding>
    );
  }

  if (!isBooking) {
    actions.push(
      <Padding bottom="xs" key="viewApplication">
        <Button
          as={Link}
          width="100%"
          icon="file-text"
          to={`/projects/${application.project.airtableId}/applications/${
            application.airtableId
          }`}
        >
          View Application
        </Button>
      </Padding>
    );

    actions.push(
      <DeclineApplicationButton key="decline" application={application} />
    );
  }

  if (isBooking) {
    actions.push(
      <Button
        as={Link}
        width="100%"
        icon="check"
        key="viewTasks"
        intent="success"
        appearance="primary"
        to={`/manage/${application.airtableId}`}
      >
        View Tasks
      </Button>
    );
  }

  return actions;
};

export default ClientActions;
