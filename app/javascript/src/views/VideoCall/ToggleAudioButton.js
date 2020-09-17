import React from "react";
import useLocalAudioToggle from "./useLocalAudioToggle";

export default function ToggleAudioButton({ disabled }) {
  const [isAudioEnabled, toggleAudio] = useLocalAudioToggle();

  return (
    <button onClick={toggleAudio} disabled={disabled}>
      {isAudioEnabled ? "Mute" : "Unmute"}
    </button>
  );
}
