import React from "react";
import { Box } from "@advisable/donut";
import Participant from "./Participant";
import useParticipants from "./useParticipants";
import WaitingForOthers from "./WaitingForOthers";

function gridTemplate(numberOfParticipants) {
  if (numberOfParticipants >= 8) {
    return "1fr 1fr 1fr";
  } else if (numberOfParticipants >= 3) {
    return "1fr 1fr";
  } else {
    return "1fr";
  }
}

export default function Participants() {
  const participants = useParticipants();

  if (participants.length === 0) {
    return <WaitingForOthers />;
  }

  return (
    <Box
      display="grid"
      height="100vh"
      gridTemplate={gridTemplate(participants.length)}
    >
      {participants.map((participant) => (
        <Participant key={participant.sid} participant={participant} />
      ))}
    </Box>
  );
}
