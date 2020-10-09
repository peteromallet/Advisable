import React from "react";
import Lobby from "./Lobby";
import Actions from "./Actions";
import LocalVideo from "./LocalVideo";
import Participants from "./Participants";
import VideoCallLeft from "./VideoCallLeft";
import useCallContext from "./useCallContext";
import ReconnectingNotification from "./ReconnectingNotification";

export default function VideoCallRoom() {
  const { roomState } = useCallContext();

  if (roomState === "disconnected") {
    return <Lobby />;
  }

  if (roomState === "left") {
    return <VideoCallLeft />;
  }

  return (
    <>
      <Participants />
      <LocalVideo />
      <ReconnectingNotification />
      <Actions />
    </>
  );
}
