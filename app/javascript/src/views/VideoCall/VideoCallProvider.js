import React, { createContext } from "react";
import useRoom from "./useRoom";
import useLocalTracks from "./useLocalTracks";

export const VideoCallContext = createContext();

export default function VideoCallProvider({ data, children }) {
  const {
    localTracks,
    audioTrackError,
    videoTrackError,
    getLocalVideoTrack,
    removeLocalVideoTrack,
    isAcquiringLocalTracks,
  } = useLocalTracks();
  const { room, isConnecting, connect, roomState, leave } = useRoom(
    data.id,
    data.accessToken,
    localTracks,
  );

  const value = {
    room,
    data,
    leave,
    connect,
    roomState,
    localTracks,
    isConnecting,
    audioTrackError,
    videoTrackError,
    getLocalVideoTrack,
    removeLocalVideoTrack,
    isAcquiringLocalTracks,
  };

  return (
    <VideoCallContext.Provider value={value}>
      {children}
    </VideoCallContext.Provider>
  );
}
