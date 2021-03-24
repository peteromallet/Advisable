import React from "react";
import { Button, Modal } from "@advisable/donut";
import { Add } from "@styled-icons/ionicons-outline/Add";
import InviteMemberForm from "./InviteMemberForm";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";

export default function NewTeamMember({ company }) {
  const modal = useDialogState();

  const handleInvite = () => {
    modal.hide();
  };

  return (
    <>
      <Modal modal={modal} padding={8} label="Invite team member">
        <InviteMemberForm company={company} onInvite={handleInvite} />
      </Modal>
      <DialogDisclosure {...modal}>
        {(props) => (
          <Button {...props} mt={6} size="xs" variant="subtle" prefix={<Add />}>
            Add team member
          </Button>
        )}
      </DialogDisclosure>
    </>
  );
}
