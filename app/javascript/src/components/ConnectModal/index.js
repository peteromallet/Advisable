import React from "react";
import { Modal } from "@advisable/donut";
import CreateConversation from "./CreateConversation";
import RequestCall from "./RequestCall";
import useViewer from "src/hooks/useViewer";
import AuthenticateForConnection from "./AuthenticateForConnection";

function ConnectionType({ state, ...props }) {
  if (state.connectionType === "MESSAGE") {
    return <CreateConversation state={state} {...props} />;
  }

  return <RequestCall state={state} {...props} />;
}

export default function ConnectModal({ state, ...props }) {
  const viewer = useViewer();

  return (
    <Modal modal={state.modal} padding={0}>
      {viewer ? (
        <ConnectionType state={state} {...props} />
      ) : (
        <AuthenticateForConnection state={state} {...props} />
      )}
    </Modal>
  );
}
