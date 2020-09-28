import React from "react";
import { Videocam } from "@styled-icons/ionicons-outline";
import ActionBar from "components/ActionBar";
import useLocalVideoToggle from "./useLocalVideoToggle";

export default function ToggleVideoButton({ disabled }) {
  const [isVideoEnabled, toggleVideo] = useLocalVideoToggle();

  return (
    <ActionBar.Item
      disabled={disabled}
      onClick={toggleVideo}
      icon={<Videocam />}
      label={isVideoEnabled ? "Hide" : "Show"}
    />
  );
}
