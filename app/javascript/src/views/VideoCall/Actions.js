import React from "react";
import useCallContext from "./useCallContext";
import ToggleAudioButton from "./ToggleAudioButton";
import ToggleVideoButton from "./ToggleVideoButton";
import EndCallButton from "./EndCallButton";
import SettingsButton from "./SettingsButton";
import ActionBar from "components/ActionBar";

export default function Actions() {
  const { roomState } = useCallContext();
  const isReconnecting = roomState === "reconnecting";

  return (
    <ActionBar>
      <ToggleAudioButton disabled={isReconnecting} />
      <ToggleVideoButton disabled={isReconnecting} />
      <SettingsButton />
      <EndCallButton disabled={isReconnecting} />
    </ActionBar>
  );
}
