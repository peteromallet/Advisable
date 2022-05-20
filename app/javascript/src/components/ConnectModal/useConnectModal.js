import { useState, useMemo } from "react";
import { useDialogState } from "reakit";

export const MESSAGE = "MESSAGE";
export const REQUEST_CALL = "REQUEST_CALL";

export default function useConnectModal() {
  const modal = useDialogState();
  const [connectionType, setConnectionType] = useState("");

  const connectModal = useMemo(() => {
    return {
      modal,
      connectionType,
      message: () => {
        setConnectionType(MESSAGE);
        modal.show();
      },
      requestCall: () => {
        setConnectionType(REQUEST_CALL);
        modal.show();
      },
    };
  }, [modal, connectionType]);

  return connectModal;
}
