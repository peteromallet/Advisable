import React from "react";
import { Link } from "react-router-dom";
import { Stack, Box, Button, Modal, useModal } from "@advisable/donut";
import { useNotifications } from "components/Notifications";
import RejectApplicationForm from "components/RejectApplicationForm";
import CreateBookingButton from "../../../components/CreateBookingButton";
import ReportUnresponsive from "./ReportUnresponsive";
import { Check } from "@styled-icons/feather/Check";
import { FileText } from "@styled-icons/feather/FileText";

function RejectApplicationAction({ application }) {
  const modal = useModal();
  const notifications = useNotifications();
  const firstName = application.specialist.firstName;

  const handleReject = (response) => {
    if (!response.errors) {
      notifications.notify(`You have rejected ${firstName}`);
    }
  };

  return (
    <>
      <Modal modal={modal} label="Reject application">
        <RejectApplicationForm
          modal={modal}
          id={application.id}
          firstName={firstName}
          onCancel={modal.hide}
          onReject={handleReject}
        />
      </Modal>
      <Button width="100%" variant="subtle" onClick={modal.show}>
        Reject {firstName}
      </Button>
    </>
  );
}

// Renders all of the available actions in the messages sidebar when viewed
// by the client.
const ClientActions = ({ application }) => {
  const actions = [];
  const isBooking = application.status === "Working";
  const isRejected = application.status === "Application Rejected";

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
      <Button
        as={Link}
        width="100%"
        prefix={<FileText />}
        key="viewProposal"
        to={`/projects/${application.project.id}/applications/${application.id}/proposal`}
      >
        View Proposal
      </Button>,
    );
  }

  if (!isBooking) {
    actions.push(
      <Button
        as={Link}
        width="100%"
        variant="subtle"
        prefix={<FileText />}
        key="viewApplication"
        to={`/projects/${application.project.id}/applications/${application.id}`}
      >
        View Application
      </Button>,
    );
  }

  if (!isBooking && !isRejected) {
    actions.push(
      <RejectApplicationAction key="decline" application={application} />,
    );
  }

  if (isBooking) {
    actions.push(
      <Button
        as={Link}
        width="100%"
        key="viewTasks"
        prefix={<Check />}
        to={`/manage/${application.id}`}
      >
        View Tasks
      </Button>,
    );
  }

  actions.push(
    <ReportUnresponsive
      asClient
      key="reportUnresponsive"
      application={application}
    />,
  );

  return <Stack spacing="sm">{actions}</Stack>;
};

export default ClientActions;
