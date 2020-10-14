import React from "react";
import SwitchToZoom from "./SwitchToZoom";
import { useDialogState } from "reakit/Dialog";
import { Text, Modal, Button, Paragraph } from "@advisable/donut";
import ActionBar from "components/ActionBar";
import { Help } from "@styled-icons/ionicons-outline";

export default function HelpAction() {
  const modal = useDialogState();

  return (
    <>
      <Modal padding="xl" modal={modal} label="Help">
        <Text
          fontSize="4xl"
          marginBottom="md"
          color="neutral900"
          fontWeight="medium"
          letterSpacing="-0.01em"
        >
          Having issues with your call?
        </Text>
        <Paragraph marginBottom="xl">
          Advisable video calls is a new feature that we are beta testing. If
          you are having trouble joining the call please click the button below
          to swtich from Advisable video calls to Zoom.
        </Paragraph>
        <SwitchToZoom marginRight="md" />
        <Button variant="subtle" onClick={modal.hide}>
          Cancel
        </Button>
      </Modal>
      <ActionBar.Item icon={<Help />} onClick={modal.show} label="Help" />
    </>
  );
}
