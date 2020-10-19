import React, { useEffect } from "react";
import useSound from "use-sound";
import { Box } from "@advisable/donut";
import Participant from "./Participant";
import useParticipants from "./useParticipants";
import WaitingForOthers from "./WaitingForOthers";
import usePrevious from "../../utilities/usePrevious";
import joinSound from "./sounds/join.mp3";
import leaveSound from "./sounds/leave.mp3";

const SOUND_EFFECT_VOLUME = 0.5;

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
  const [playJoinSound] = useSound(joinSound, {
    volume: SOUND_EFFECT_VOLUME,
  });
  const [playLeaveSound] = useSound(leaveSound, {
    volume: SOUND_EFFECT_VOLUME,
  });
  const participantCount = usePrevious(participants.length);

  useEffect(() => {
    if (participants.length > participantCount) {
      playJoinSound();
    }

    if (participants.length < participantCount) {
      playLeaveSound();
    }
  }, [participants, participantCount, playJoinSound, playLeaveSound]);

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
