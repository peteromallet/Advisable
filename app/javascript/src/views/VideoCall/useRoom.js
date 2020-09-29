import Video from "twilio-video";
import { useRef, useCallback, useState, useEffect } from "react";

export default function useRoom(name, accessToken, localTracks) {
  const localTracksRef = useRef([]);
  const [room, setRoom] = useState();
  const [roomState, setRoomState] = useState("disconnected");
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    // It can take a moment for Video.connect to connect to a room. During this time, the user may have enabled or disabled their
    // local audio or video tracks. If this happens, we store the localTracks in this ref, so that they are correctly published
    // once the user is connected to the room.
    localTracksRef.current = localTracks;
  }, [localTracks]);

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

    Video.connect(accessToken, {
      name,
      bandwidthProfile: {
        video: {
          mode: "grid",
          renderDimensions: {
            high: { width: 1080, height: 720 },
            standard: { width: 640, height: 480 },
            low: { width: 320, height: 240 },
          },
        },
      },
    }).then((newRoom) => {
      setRoom(newRoom);
      setIsConnecting(false);
      const disconnect = () => newRoom.disconnect();

      localTracksRef.current.forEach((track) =>
        newRoom.localParticipant.publishTrack(track),
      );

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
