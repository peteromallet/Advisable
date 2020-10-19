import Video from "twilio-video";
import React, { useEffect, useState } from "react";
import Participant from "./Participant";

export default function Room({ roomName, accessToken }) {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };
    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant),
      );
    };

    Video.connect(accessToken, {
      name: roomName,
    }).then((room) => {
      setRoom(room);
      window.addEventListener("beforeunload", () => room.disconnect());
      window.addEventListener("pagehide", () => room.disconnect());
      room.on("participantConnected", participantConnected);
      room.on("participantDisconnected", participantDisconnected);
      room.participants.forEach(participantConnected);
    });

    return () => {
      setRoom((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
          currentRoom.localParticipant.tracks.forEach(function (
            trackPublication,
          ) {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [roomName, accessToken]);

  return (
    <>
      <h3>Me</h3>
      {room ? (
        <Participant
          key={room.localParticipant.sid}
          participant={room.localParticipant}
        />
      ) : null}
      <h3>Remote Participants</h3>
      {participants.map((p) => (
        <Participant key={p.sid} participant={p} />
      ))}
    </>
  );
}
