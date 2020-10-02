import React from "react";
import { Videocam } from "@styled-icons/ionicons-outline";
import ActionBar from "components/ActionBar";
import useCallContext from "./useCallContext";
import useLocalVideoToggle from "./useLocalVideoToggle";

export default function ToggleVideoButton({ disabled }) {
  const { videoTrackError } = useCallContext();
  const [isVideoEnabled, toggleVideo] = useLocalVideoToggle();

  return (
    <ActionBar.Item
      disabled={disabled || Boolean(videoTrackError)}
      onClick={toggleVideo}
      icon={<Videocam />}
      label={isVideoEnabled ? "Hide" : "Show"}
    />
  );
}
