import React from "react";
import styled from "styled-components";
import { theme } from "@advisable/donut";
import ParticipantTracks from "./ParticipantTracks";
import { useParticipantDetails } from "./queries";

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

const StyledParticipantName = styled.div`
  top: 8px;
  left: 8px;
  font-size: 14px;
  font-weight: 500;
  position: absolute;
  border-radius: 6px;
  padding: 3px 4px 2px 4px;
  color: ${theme.colors.neutral900};
  background: rgba(255, 255, 255, 0.9);
`;

export default function Participant({ participant }) {
  const { data } = useParticipantDetails(participant.identity);
  const avatar = data?.videoCall?.participant?.avatar;
  const firstName = data?.videoCall?.participant?.firstName;

  return (
    <StyledParticipant data-cy-participant={participant.identity}>
      {firstName ? (
        <StyledParticipantName>{firstName}</StyledParticipantName>
      ) : null}
      <ParticipantTracks participant={participant} avatar={avatar} />
    </StyledParticipant>
  );
}
