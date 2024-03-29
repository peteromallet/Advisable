import React from "react";
import { useDialogState } from "reakit/Dialog";
import { Text, Paragraph, Modal } from "@advisable/donut";
import useCallContext from "./useCallContext";

export default function TrackPermissionModal() {
  const { audioTrackError, videoTrackError } = useCallContext();
  const error = Boolean(audioTrackError || videoTrackError);
  const noPermission = error === "NotAllowedError";
  const modal = useDialogState({
    visible: noPermission,
  });

  React.useEffect(() => {
    if (noPermission) {
      modal.show();
    } else {
      modal.hide();
    }
  }, [modal, noPermission]);

  return (
    <Modal
      modal={modal}
      padding="2xl"
      tabIndex="0"
      showCloseButton={false}
      hideOnClickOutside={false}
      label="No access to camera"
    >
      <Text
        fontSize="2xl"
        marginBottom="xs"
        fontWeight="medium"
        letterSpacing="-0.02rem"
      >
        Camera and microphone are blocked
      </Text>
      <Paragraph>
        We need access to your camera and microphone. Please check your browser
        settings to allow access and refresh the page.
      </Paragraph>
    </Modal>
  );
}
