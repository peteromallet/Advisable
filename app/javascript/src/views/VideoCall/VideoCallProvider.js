import React, { createContext } from "react";
import useRoom from "./useRoom";
import useLocalTracks from "./useLocalTracks";

export const VideoCallContext = createContext();

export default function VideoCallProvider({ data, children }) {
  const {
    localTracks,
    getLocalVideoTrack,
    removeLocalVideoTrack,
  } = useLocalTracks();
  const { room, isConnecting, connect, roomState } = useRoom(
    data.id,
    data.accessToken,
  );

  const value = {
    room,
    data,
    connect,
    roomState,
    localTracks,
    isConnecting,
    getLocalVideoTrack,
    removeLocalVideoTrack,
  };

  return (
    <VideoCallContext.Provider value={value}>
      {children}
    </VideoCallContext.Provider>
  );
}
