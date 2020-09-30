import React from "react";
import { useDialogState } from "reakit/Dialog";
import { Box, Text, Modal, Button, Label } from "@advisable/donut";
import ActionBar from "components/ActionBar";
import { Cog } from "@styled-icons/ionicons-outline";
import AudioInputSelection from "./AudioInputSelection";
import VideoInputSelection from "./VideoInputSelection";

export default function SettingsButton() {
  const modal = useDialogState();

  return (
    <>
      <Modal padding="xl" modal={modal} label="Settings">
        <Text
          fontSize="4xl"
          marginBottom="xl"
          color="neutral900"
          fontWeight="medium"
          letterSpacing="-0.01em"
        >
          Settings
        </Text>
        <Box marginBottom="lg">
          <Label marginBottom="xs">Audio Input</Label>
          <AudioInputSelection />
        </Box>
        <Box marginBottom="xl">
          <Label marginBottom="xs">Video Input</Label>
          <VideoInputSelection />
        </Box>
        <Button variant="dark" onClick={modal.hide}>
          Done
        </Button>
      </Modal>
      <ActionBar.Item icon={<Cog />} onClick={modal.show} label="Settings" />
    </>
  );
}
