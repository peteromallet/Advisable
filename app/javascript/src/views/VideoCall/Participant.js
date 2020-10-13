import React from "react";
import styled from "styled-components";
import { theme } from "@advisable/donut";
import ParticipantTracks from "./ParticipantTracks";

const StyledParticipant = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  max-height: 100vh;
  position: relative;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.neutral700};
`;

export default function Participant({ participant }) {
  return (
    <StyledParticipant data-cy-participant={participant.identity}>
      <ParticipantTracks participant={participant} />
    </StyledParticipant>
  );
}
