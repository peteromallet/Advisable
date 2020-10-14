import React from "react";
import { Button } from "@advisable/donut";
import { useSetupZoomForVideoCall } from "./queries";

export default function SwitchToZoom(props) {
  const [switchToZoom, { loading }] = useSetupZoomForVideoCall();

  return (
    <Button {...props} variant="dark" onClick={switchToZoom} loading={loading}>
      Switch to Zoom
    </Button>
  );
}
