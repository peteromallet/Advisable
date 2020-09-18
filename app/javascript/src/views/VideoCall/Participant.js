import React from "react";
import styled from "styled-components";
import { rgba } from "polished";
import { theme } from "@advisable/donut";
import ParticipantTracks from "./ParticipantTracks";

const StyledParticipant = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  background: ${theme.colors.neutral700};

  video {
    width: 100%;
  }
`;

const StyledIdentity = styled.div`
  top: 8px;
  left: 8px;
  color: white;
  font-size: 14px;
  font-weight: 600;
  position: absolute;
  border-radius: 6px;
  padding: 4px 8px 3px 8px;
  background: ${rgba(theme.colors.neutral900, 0.8)};
`;

export default function Participant({ participant }) {
  return (
    <StyledParticipant>
      <StyledIdentity>{participant.identity}</StyledIdentity>
      <ParticipantTracks participant={participant} />
    </StyledParticipant>
  );
}
