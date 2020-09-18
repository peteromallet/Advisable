import React from "react";
import Lobby from "./Lobby";
import Actions from "./Actions";
import LocalVideo from "./LocalVideo";
import Participants from "./Participants";
import useCallContext from "./useCallContext";
import ReconnectingNotification from "./ReconnectingNotification";

export default function VideoCallRoom() {
  const { roomState } = useCallContext();

  if (roomState === "disconnected") {
    return <Lobby />;
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
