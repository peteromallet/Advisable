import React, { useEffect, useState } from "react";
import { Modal } from "@advisable/donut";
import RequestCall from "./RequestCall";
import useViewer from "src/hooks/useViewer";
import AuthenticateForConnection from "./AuthenticateForConnection";
import SelectConnectionType from "./SelectConnectionType";
import ConnectViaMessaging from "./CreateConversation";
import { trackEvent } from "src/utilities/segment";

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

export default function ConnectModal({ modal, specialist, ...props }) {
  const viewer = useViewer();

  useEffect(() => {
    if (modal.visible) {
      trackEvent("Opened Connect Modal", { specialist: specialist.uid });
    }
  }, [modal, specialist]);

  return (
    <Modal modal={modal} padding={0}>
      <div className="px-8 py-10">
        {viewer ? (
          <ConnectionType modal={modal} specialist={specialist} {...props} />
        ) : (
          <AuthenticateForConnection specialist={specialist} {...props} />
        )}
      </div>
    </Modal>
  );
}
