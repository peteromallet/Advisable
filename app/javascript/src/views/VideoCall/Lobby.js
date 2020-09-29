import React from "react";
import { Box, Text, Button, theme } from "@advisable/donut";
import VideoTrack from "./VideoTrack";
import useCallContext from "./useCallContext";
import ToggleAudioButton from "./ToggleAudioButton";
import ToggleVideoButton from "./ToggleVideoButton";
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
  const { localTracks, connect, data, isConnecting } = useCallContext();
  const videoTrack = localTracks.find((t) => t.name.includes("camera"));

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Box marginBottom="xl">
        <StyledVideoPreview>
          {videoTrack ? (
            <VideoTrack track={videoTrack} />
          ) : (
            <span>Camera is off</span>
          )}
        </StyledVideoPreview>
      </Box>
      <Text
        fontSize="4xl"
        fontWeight="medium"
        color="neutral900"
        marginBottom="md"
        letterSpacing="-0.02rem"
      >
        {data.name}
      </Text>
      <Box marginBottom="lg">
        <ToggleAudioButton />
        <ToggleVideoButton />
      </Box>
      <Button size="l" onClick={connect} loading={isConnecting}>
        Join Call
      </Button>
    </Box>
  );
}
