import React from "react";
import styled from "styled-components";
import Participant from "./Participant";
import useCallContext from "./useCallContext";

const StyledLocalVideo = styled.div`
  width: 300px;
  height: 225px;
  position: fixed;
  overflow: hidden;
  border-radius: 12px;
  right: 20px;
  bottom: 20px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
`;

export default function LocalVideo() {
  const { room } = useCallContext();

  return (
    <StyledLocalVideo>
      <Participant participant={room.localParticipant} />
    </StyledLocalVideo>
  );
}
