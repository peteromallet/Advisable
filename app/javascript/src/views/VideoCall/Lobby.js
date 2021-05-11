import React, { useEffect } from "react";
import ActionBar from "components/ActionBar";
import { useDialogState } from "reakit/Dialog";
import { Box, Button, Modal, Text, Link, theme } from "@advisable/donut";
import VideoTrack from "./VideoTrack";
import HelpAction from "./HelpAction";
import useCallContext from "./useCallContext";
import SettingsButton from "./SettingsButton";
import ToggleAudioButton from "./ToggleAudioButton";
import ToggleVideoButton from "./ToggleVideoButton";
import TrackPermissionModal from "./TrackPermissionModal";
import styled from "styled-components";

const StyledVideoPreview = styled.div`
  width: 480px;
  height: 270px;
  display: flex;
  overflow: hidden;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral200};
  background: ${theme.colors.neutral900};
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
`;

export default function Lobby() {
  const {
    localTracks,
    connect,
    isConnecting,
    audioTrackError,
    videoTrackError,
    isAcquiringLocalTracks,
  } = useCallContext();
  const hasError = Boolean(audioTrackError && videoTrackError);
  const notAllowedError = [audioTrackError, videoTrackError].includes(
    "NotAllowedError",
  );
  const modal = useDialogState({ visible: notAllowedError });
  const videoTrack = localTracks.find((t) => t.name.includes("camera"));

  useEffect(() => {
    if (!modal.visible && notAllowedError) {
      modal.show();
    }
  }, [notAllowedError, modal]);

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      paddingBottom="100px"
    >
      <Modal
        modal={modal}
        hideOnClickOutside={false}
        showCloseButton={false}
        label="No access to camera or microphone"
      >
        <Text
          fontSize="2xl"
          fontWeight="500"
          marginBottom={4}
          textAlign="center"
          letterSpacing="-0.02rem"
        >
          It looks like we don&apos;t have access to your camera or microphone
        </Text>
        <Text color="neutral700" lineHeight="1.2" textAlign="center">
          Please update your browser settings to allow access to your camera or
          microphone and refresh the page.{" "}
          <Link.External
            variant="default"
            href="https://www.notion.so/advisable/How-to-enable-camera-and-microphone-access-9bf7dea7571e4b6fb0c3993db84648e1"
            target="_blank"
          >
            Click here
          </Link.External>{" "}
          to read how to enable camera acesss for your browser.
        </Text>
      </Modal>
      <Box marginBottom="xl">
        <StyledVideoPreview>
          <VideoTrack track={videoTrack} />
        </StyledVideoPreview>
      </Box>
      <Button
        size="l"
        data-testid="joinCall"
        onClick={connect}
        loading={isConnecting}
        disabled={hasError || isAcquiringLocalTracks}
      >
        Join Video Call
      </Button>
      <ActionBar>
        <ToggleAudioButton />
        <ToggleVideoButton />
        <SettingsButton />
        <HelpAction />
      </ActionBar>
      <TrackPermissionModal />
    </Box>
  );
}
