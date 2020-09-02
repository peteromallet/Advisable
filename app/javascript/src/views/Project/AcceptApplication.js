import React, { useCallback } from "react";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import ActionBar from "./ActionBar";
import { useRequestIntroduction } from "./queries";
import UpdateAvailability from "./UpdateAvailability";
import { PersonAdd } from "@styled-icons/ionicons-solid";

export default function AcceptApplication({ application, project }) {
  const dialog = useDialogState();
  const [requestIntroduction] = useRequestIntroduction(application);

  const sendRequest = useCallback(async () => {
    await requestIntroduction({
      variables: {
        input: {
          application: application.id,
        },
      },
    });
  }, [requestIntroduction, application.id]);

  const afterUpdateAvailability = useCallback(() => {
    sendRequest();
    dialog.hide();
  }, [sendRequest, dialog]);

  return (
    <>
      <UpdateAvailability
        dialog={dialog}
        firstName={application.specialist.firstName}
        onUpdate={afterUpdateAvailability}
      />
      <DialogDisclosure
        {...dialog}
        as={ActionBar.Item}
        label="Accept"
        variant="primary"
        icon={<PersonAdd />}
        data-walkthrough="actionBarAccept"
      />
    </>
  );
}
