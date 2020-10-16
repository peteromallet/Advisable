import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import ActionBar from "./ActionBar";
import UpdateAvailability from "./UpdateAvailability";
import { PersonAdd } from "@styled-icons/ionicons-solid";

export default function AcceptApplication({ application }) {
  const dialog = useDialogState();

  return (
    <>
      <UpdateAvailability
        dialog={dialog}
        application={application}
        onUpdate={dialog.hide}
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
