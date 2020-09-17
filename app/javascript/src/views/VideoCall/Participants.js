import React from "react";
import { Box } from "@advisable/donut";
import Participant from "./Participant";
import useParticipants from "./useParticipants";

export default function Participants() {
  const participants = useParticipants();

  return (
    <Box display="grid">
      {participants.map((participant) => (
        <Participant key={participant.sid} participant={participant} />
      ))}
    </Box>
  );
}
