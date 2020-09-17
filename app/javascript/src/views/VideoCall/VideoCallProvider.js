import React, { createContext } from "react";
import useRoom from "./useRoom";
import useLocalTracks from "./useLocalTracks";

export const VideoCallContext = createContext();

export default function VideoCallProvider({ data, children }) {
  const { localTracks } = useLocalTracks();
  const { room, isConnecting, connect, roomState } = useRoom(
    data.id,
    data.accessToken,
  );

  const value = { room, localTracks, isConnecting, connect, roomState, data };

  return (
    <VideoCallContext.Provider value={value}>
      {children}
    </VideoCallContext.Provider>
  );
}
