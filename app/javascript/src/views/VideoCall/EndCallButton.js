import React from "react";
import { LogOut } from "@styled-icons/ionicons-outline";
import ActionBar from "components/ActionBar";
import useCallContext from "./useCallContext";

export default function EndCallButton({ disabled }) {
  const { leave } = useCallContext();

  return (
    <ActionBar.Item
      onClick={leave}
      disabled={disabled}
      icon={<LogOut />}
      label="Leave"
    />
  );
}
