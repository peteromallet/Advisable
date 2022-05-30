import React, { useState } from "react";
import { Modal } from "@advisable/donut";
import CreateConversation from "./CreateConversation";
import RequestCall from "./RequestCall";
import useViewer from "src/hooks/useViewer";
import AuthenticateForConnection from "./AuthenticateForConnection";
import SelectConnectionType from "./SelectConnectionType";

function ConnectionType(props) {
  const [connectionType, setConnectionType] = useState(null);

  if (connectionType === "MESSAGE") {
    return (
      <CreateConversation onBack={() => setConnectionType(null)} {...props} />
    );
  }

  if (connectionType === "REQUEST_CALL") {
    return <RequestCall onBack={() => setConnectionType(null)} {...props} />;
  }

  return (
    <SelectConnectionType
      requestCall={() => setConnectionType("REQUEST_CALL")}
      message={() => setConnectionType("MESSAGE")}
      {...props}
    />
  );
}

export default function ConnectModal({ modal, ...props }) {
  const viewer = useViewer();

  return (
    <Modal modal={modal} padding={0}>
      {viewer ? (
        <ConnectionType {...props} />
      ) : (
        <AuthenticateForConnection {...props} />
      )}
    </Modal>
  );
}
