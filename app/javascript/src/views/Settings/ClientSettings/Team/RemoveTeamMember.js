import React from "react";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import { Text, Button, Modal } from "@advisable/donut";
import { Trash } from "@styled-icons/heroicons-outline/Trash";
import { useRemoveUserFromCompany } from "./queries";

export default function RemoveTeamMember({ member }) {
  const modal = useDialogState();
  const [removeUser, { loading, error }] = useRemoveUserFromCompany(member.id);

  return (
    <>
      <DialogDisclosure {...modal} as={Button} size="xs" variant="subtle">
        <Trash />
      </DialogDisclosure>
      <Modal modal={modal} padding={8} label={`Want to remove ${member.name}?`}>
        <Text
          mb={2}
          as="h2"
          fontSize="4xl"
          fontWeight="medium"
          color="neutral900"
          letterSpacing="-0.02rem"
        >
          Are you sure you want to remove {member.name}?
        </Text>
        <Text mb={6} lineHeight="1.3" color="neutral800">
          Their account will be disabled and they will no longer be able to
          login to Advisable.
        </Text>
        {error ? (
          <Text color="red600">
            Hmm, it looks like something went wrong. Please try again.
          </Text>
        ) : null}
        <Button variant="dark" onClick={removeUser} loading={loading}>
          Remove
        </Button>
        <Button variant="subtle" ml={2} onClick={modal.hide}>
          Cancel
        </Button>
      </Modal>
    </>
  );
}
