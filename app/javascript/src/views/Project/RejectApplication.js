import React from "react";
import ActionBar from "./ActionBar";
import { useParams, useHistory } from "react-router-dom";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import ActionBarModal from "./ActionBarModal";
import RejectApplicationForm from "components/RejectApplicationForm";
import { useNotifications } from "components/Notifications";
import { Trash } from "@styled-icons/ionicons-solid";
import { useRejectCacheUpdate } from "./queries";

export default function RejectApplication({ application }) {
  const { id } = useParams();
  const history = useHistory();
  const dialog = useDialogState();
  const notifications = useNotifications();
  const onRejectUpdate = useRejectCacheUpdate(application);
  const firstName = application.specialist.firstName;
  const isApplied = application.status === "Applied";

  const handleReject = (response) => {
    if (response.errors) {
      notifications.notify("Something went wrong, please try again", {
        variant: "error",
      });
      return;
    }

    notifications.notify(`You have rejected ${firstName}`);

    if (!isApplied) {
      history.replace(`/projects/${id}/candidates`);
    } else {
      dialog.hide();
    }
  };

  return (
    <>
      <DialogDisclosure
        {...dialog}
        as={ActionBar.Item}
        label="Reject"
        icon={<Trash />}
        data-walkthrough="actionBarReject"
      />
      <ActionBarModal dialog={dialog} label={`Reject ${firstName}`}>
        <RejectApplicationForm
          id={application.id}
          firstName={firstName}
          onReject={handleReject}
          onCancel={dialog.hide}
          mutationOptions={{ update: onRejectUpdate }}
        />
      </ActionBarModal>
    </>
  );
}
