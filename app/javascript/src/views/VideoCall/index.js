import React from "react";
import Loading from "components/Loading";
import VideoCallRoom from "./VideoCallRoom";
import VideoCallProvider from "./VideoCallProvider";
import NotFound, { isNotFound } from "../NotFound";
import UnsupportedBrowser from "./UnsupportedBrowser";
import { useVideoCall } from "./queries";
import SwitchedToZoom from "./SwitchedToZoom";
import SwitchingToZoom from "./SwitchingToZoom";

export default function VideoCall() {
  const { data, loading, error } = useVideoCall();

  if (loading) {
    return <Loading />;
  }

  if (isNotFound(error)) {
    return <NotFound />;
  }

  const { fallback, zoomMeetingId } = data.videoCall;
  const switchingToZoom = fallback && !zoomMeetingId;

  if (switchingToZoom) {
    return <SwitchingToZoom />;
  }

  if (zoomMeetingId) {
    return <SwitchedToZoom data={data} />;
  }

  return (
    <UnsupportedBrowser>
      <VideoCallProvider data={data.videoCall}>
        <VideoCallRoom />
      </VideoCallProvider>
    </UnsupportedBrowser>
  );
}
