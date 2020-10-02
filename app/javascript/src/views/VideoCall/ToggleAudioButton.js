import React from "react";
import { VolumeHigh, VolumeMute } from "@styled-icons/ionicons-outline";
import ActionBar from "components/ActionBar";
import useLocalAudioToggle from "./useLocalAudioToggle";
import useCallContext from "./useCallContext";

export default function ToggleAudioButton({ disabled }) {
  const { audioTrackError } = useCallContext();
  const [isAudioEnabled, toggleAudio] = useLocalAudioToggle();

  return (
    <ActionBar.Item
      onClick={toggleAudio}
      disabled={disabled || Boolean(audioTrackError)}
      icon={isAudioEnabled ? <VolumeHigh /> : <VolumeMute />}
      label={isAudioEnabled ? "Mute" : "Unmute"}
    />
  );
}
