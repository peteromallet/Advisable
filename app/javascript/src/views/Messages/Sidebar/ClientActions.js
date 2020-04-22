import React from "react";
import { Link } from "react-router-dom";
import { Padding, RoundedButton } from "@advisable/donut";
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
      <Padding bottom="xs" key="createBooking">
        <CreateBookingButton application={application} />
      </Padding>,
    );
  }

  if (!isBooking && application.status === "Proposed") {
    actions.push(
      <Padding bottom="xs" key="viewProposal">
        <RoundedButton
          as={Link}
          width="100%"
          prefix={<FileText />}
          to={`/projects/${application.project.airtableId}/applications/${application.airtableId}/proposal`}
        >
          View Proposal
        </RoundedButton>
      </Padding>,
    );
  }

  if (!isBooking) {
    actions.push(
      <Padding bottom="xs" key="viewApplication">
        <RoundedButton
          as={Link}
          width="100%"
          variant="subtle"
          prefix={<FileText />}
          to={`/projects/${application.project.airtableId}/applications/${application.airtableId}`}
        >
          View Application
        </RoundedButton>
      </Padding>,
    );

    actions.push(
      <DeclineApplicationButton key="decline" application={application} />,
    );
  }

  if (isBooking) {
    actions.push(
      <RoundedButton
        as={Link}
        width="100%"
        key="viewTasks"
        prefix={<Check />}
        to={`/manage/${application.airtableId}`}
      >
        View Tasks
      </RoundedButton>,
    );
  }

  return actions;
};

export default ClientActions;
