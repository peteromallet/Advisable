import Video from "twilio-video";
import { useCallback, useState, useEffect, useRef } from "react";

export default function useRoom(name, accessToken) {
  const [room, setRoom] = useState(null);
  const [roomState, setRoomState] = useState("disconnected");
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (room) {
      const updateRoomState = () => setRoomState(room.state || "disconnected");
      setRoomState();
      room
        .on("disconnected", updateRoomState)
        .on("reconnected", updateRoomState)
        .on("reconnecting", updateRoomState);

      return () => {
        room
          .off("disconnected", updateRoomState)
          .off("reconnected", updateRoomState)
          .off("reconnecting", updateRoomState);
      };
    }
  }, [room]);

  const connect = useCallback(() => {
    setIsConnecting(true);

    Video.connect(accessToken, { name }).then((newRoom) => {
      setRoom(newRoom);
      setIsConnecting(false);
      const disconnect = () => newRoom.disconnect();

      newRoom.once("disconnected", () => {
        window.removeEventListener("beforeunload", disconnect);
        window.removeEventListener("pagehide", disconnect);
      });

      window.addEventListener("beforeunload", disconnect);
      window.addEventListener("pagehide", disconnect);
    });

    return () => {
      setRoom((currentRoom) => {
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
          currentRoom.localParticipant.tracks.forEach((trackPublication) => {
            trackPublication.track.stop();
          });
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [name, accessToken]);

  return { room, isConnecting, connect, roomState };
}
