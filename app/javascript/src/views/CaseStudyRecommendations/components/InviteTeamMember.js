import React from "react";
import { DialogDisclosure } from "reakit/Dialog";
import { Heading, Text, Modal, useModal } from "@advisable/donut";
import { UserAdd } from "@styled-icons/heroicons-solid/UserAdd";
import InviteTeamMember from "src/components/InviteTeamMember";
import { NavItem } from "./Navigation";

export default function InviteTeamMemberModal() {
  const modal = useModal();

  return (
    <>
      <Modal modal={modal}>
        <Heading marginBottom={2}>Invite a co-worker to your team</Heading>
        <Text marginBottom={8} lineHeight="20px">
          Add a team member to your company on Advisable so they can discover
          projects and find top specialists.
        </Text>
        <InviteTeamMember onInvite={modal.hide} />
      </Modal>
      <NavItem as={DialogDisclosure} variant="subtle" icon={UserAdd} {...modal}>
        Invite team member
      </NavItem>
    </>
  );
}
