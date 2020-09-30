import React from "react";
import styled from "styled-components";
import VideoTrack from "./VideoTrack";
import useCallContext from "./useCallContext";
import { theme } from "@advisable/donut";

const StyledLocalVideo = styled.div`
  width: 300px;
  height: 225px;
  display: flex;
  position: fixed;
  overflow: hidden;
  border-radius: 12px;
  right: 20px;
  bottom: 20px;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral200};
  background: ${theme.colors.neutral900};
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
`;

export default function LocalVideo() {
  const { localTracks } = useCallContext();
  const videoTrack = localTracks.find((track) => track.name.includes("camera"));

  return (
    <StyledLocalVideo>
      <VideoTrack track={videoTrack} />
    </StyledLocalVideo>
  );
}
