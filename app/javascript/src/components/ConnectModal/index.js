import React, { useState } from "react";
import { Modal } from "@advisable/donut";
import RequestCall from "./RequestCall";
import useViewer from "src/hooks/useViewer";
import AuthenticateForConnection from "./AuthenticateForConnection";
import SelectConnectionType from "./SelectConnectionType";
import ConnectViaMessaging from "./CreateConversation";

function ConnectionType(props) {
  const viewer = useViewer();
  const [connectionType, setConnectionType] = useState(null);

  if (connectionType === "MESSAGE") {
    return (
      <ConnectViaMessaging onBack={() => setConnectionType(null)} {...props} />
    );
  }

  if (connectionType === "REQUEST_CALL") {
    return <RequestCall onBack={() => setConnectionType(null)} {...props} />;
  }

  if (viewer?.isSpecialist) {
    return <ConnectViaMessaging {...props} />;
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
      <div className="p-8">
        {viewer ? (
          <ConnectionType modal={modal} {...props} />
        ) : (
          <AuthenticateForConnection {...props} />
        )}
      </div>
    </Modal>
  );
}
