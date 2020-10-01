import React from "react";
import { Box } from "@advisable/donut";
import Participant from "./Participant";
import useParticipants from "./useParticipants";
import WaitingForOthers from "./WaitingForOthers";

function gridTemplate(numberOfParticipants) {
  if (numberOfParticipants >= 7) {
    return "1fr 1fr 1fr";
  } else if (numberOfParticipants >= 2) {
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
      width="100%"
      display="grid"
      height="100vh"
      gridTemplateColumns={gridTemplate(participants.length)}
    >
      {participants.map((participant) => (
        <Participant key={participant.sid} participant={participant} />
      ))}
    </Box>
  );
}
