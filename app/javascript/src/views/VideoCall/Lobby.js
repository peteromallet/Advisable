import React from "react";
import { Box, Text, Button, theme } from "@advisable/donut";
import VideoTrack from "./VideoTrack";
import useCallContext from "./useCallContext";
import styled from "styled-components";

const StyledVideoPreview = styled.div`
  width: 467px;
  height: 350px;
  overflow: hidden;
  border-radius: 16px;
  background: ${theme.colors.neutral100};
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
          {videoTrack ? <VideoTrack track={videoTrack} /> : null}
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
      <Button size="l" onClick={connect} loading={isConnecting}>
        Join Call
      </Button>
    </Box>
  );
}
