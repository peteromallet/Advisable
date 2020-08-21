import React, { useCallback } from "react";
import { DateTime } from "luxon";
import { useDialogState } from "reakit/Dialog";
import ActionBar from "./ActionBar";
import { useRequestIntroduction } from "./queries";
import UpdateAvailability from "./UpdateAvailability";
import { CheckCircle } from "@styled-icons/boxicons-solid";

export default function AcceptApplication({ application, project }) {
  const dialog = useDialogState();
  const [requestIntroduction] = useRequestIntroduction(application);
  const availability = project.user?.availability?.filter((a) => {
    return (
      DateTime.fromISO(a).startOf("day") >=
      DateTime.local().plus({ days: 1 }).startOf("day")
    );
  });

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

  const handleClick = async () => {
    if (availability.length <= 6) {
      dialog.show();
    } else {
      sendRequest();
    }
  };

  return (
    <>
      <UpdateAvailability dialog={dialog} onUpdate={afterUpdateAvailability} />
      <ActionBar.Item
        label="Accept"
        onClick={handleClick}
        icon={<CheckCircle />}
      />
    </>
  );
}
