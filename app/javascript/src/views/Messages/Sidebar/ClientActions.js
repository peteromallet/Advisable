import React from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@advisable/donut";
import CreateBookingButton from "../../../components/CreateBookingButton";
import DeclineApplicationButton from "../../../components/DeclineApplicationButton";
import { FileText, Check } from "@styled-icons/feather";

// Renders all of the available actions in the messages sidebar when viewed
// by the client.
const ClientActions = ({ application }) => {
  const actions = [];
  const isBooking = application.status === "Working";

  // Show an action to begin working with the specialist if the application is
  // in an accepted state.
  if (!isBooking && application.status === "Application Accepted") {
    actions.push(
      <Box paddingBottom="xs" key="createBooking">
        <CreateBookingButton application={application} />
      </Box>,
    );
  }

  if (!isBooking && application.status === "Proposed") {
    actions.push(
      <Box paddingBottom="xs" key="viewProposal">
        <Button
          as={Link}
          width="100%"
          prefix={<FileText />}
          to={`/projects/${application.project.airtableId}/applications/${application.airtableId}/proposal`}
        >
          View Proposal
        </Button>
      </Box>,
    );
  }

  if (!isBooking) {
    actions.push(
      <Box paddingBottom="xs" key="viewApplication">
        <Button
          as={Link}
          width="100%"
          variant="subtle"
          prefix={<FileText />}
          to={`/projects/${application.project.airtableId}/applications/${application.airtableId}`}
        >
          View Application
        </Button>
      </Box>,
    );

    actions.push(
      <DeclineApplicationButton key="decline" application={application} />,
    );
  }

  if (isBooking) {
    actions.push(
      <Button
        as={Link}
        width="100%"
        key="viewTasks"
        prefix={<Check />}
        to={`/manage/${application.airtableId}`}
      >
        View Tasks
      </Button>,
    );
  }

  return actions;
};

export default ClientActions;
