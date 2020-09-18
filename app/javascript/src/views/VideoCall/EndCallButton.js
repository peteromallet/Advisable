import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { LogOut } from "@styled-icons/ionicons-outline";
import ActionBar from "components/ActionBar";
import useCallContext from "./useCallContext";

export default function EndCallButton({ disabled }) {
  const { id } = useParams();
  const history = useHistory();
  const { room } = useCallContext();

  const handleLeave = () => {
    room.disconnect();
    history.replace(`/calls/${id}/over`);
  };

  return (
    <ActionBar.Item
      onClick={handleLeave}
      disabled={disabled}
      icon={<LogOut />}
      label="Leave"
    />
  );
}
