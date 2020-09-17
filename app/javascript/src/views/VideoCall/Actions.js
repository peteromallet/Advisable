import React from "react";
import useCallContext from "./useCallContext";
import ToggleAudioButton from "./ToggleAudioButton";

export default function Actions() {
  const { roomState } = useCallContext();
  const isReconnecting = roomState === "reconnecting";

  return (
    <>
      <ToggleAudioButton disabled={isReconnecting} />
    </>
  );
}
