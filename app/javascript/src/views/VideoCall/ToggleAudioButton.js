import React from "react";
import { VolumeHigh, VolumeMute } from "@styled-icons/ionicons-outline";
import ActionBar from "components/ActionBar";
import useLocalAudioToggle from "./useLocalAudioToggle";

export default function ToggleAudioButton({ disabled }) {
  const [isAudioEnabled, toggleAudio] = useLocalAudioToggle();

  return (
    <ActionBar.Item
      onClick={toggleAudio}
      disabled={disabled}
      icon={isAudioEnabled ? <VolumeHigh /> : <VolumeMute />}
      label={isAudioEnabled ? "Mute" : "Unmute"}
    />
  );
}
