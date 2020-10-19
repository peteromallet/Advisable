import { useEffect, useState } from "react";
import useCallContext from "./useCallContext";

export default function useParticipants() {
  const { room } = useCallContext();
  const [participants, setParticipants] = useState(
    Array.from(room.participants.values()),
  );

  useEffect(() => {
    const connected = (p) => setParticipants((previous) => [...previous, p]);
    const disconnectd = (p) => {
      setParticipants((previous) =>
        previous.filter((participant) => participant !== p),
      );
    };

    room.on("participantConnected", connected);
    room.on("participantDisconnected", disconnectd);
    return () => {
      room.off("participantConnected", connected);
      room.off("participantDisconnected", disconnectd);
    };
  }, [room]);

  return participants;
}
