import React from "react";
import { useDialogState } from "reakit/Dialog";
import { Box, Text, Modal, Button, Label } from "@advisable/donut";
import ActionBar from "components/ActionBar";
import { Cog } from "@styled-icons/ionicons-outline";
import AudioInputSelection from "./AudioInputSelection";

export default function SettingsButton() {
  const modal = useDialogState();

  return (
    <>
      <Modal padding="xl" modal={modal} label="Settings">
        <Text
          fontSize="4xl"
          marginBottom="lg"
          color="neutral900"
          fontWeight="medium"
          letterSpacing="-0.01em"
        >
          Settings
        </Text>
        <Box marginBottom="xl">
          <Label marginBottom="xs">Audio Input</Label>
          <AudioInputSelection />
        </Box>
        <Button variant="dark" onClick={modal.hide}>
          Done
        </Button>
      </Modal>
      <ActionBar.Item icon={<Cog />} onClick={modal.show} label="Settings" />
    </>
  );
}
