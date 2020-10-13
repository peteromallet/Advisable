import React from "react";
import Loading from "components/Loading";
import VideoCallRoom from "./VideoCallRoom";
import VideoCallProvider from "./VideoCallProvider";
import NotFound, { isNotFound } from "../NotFound";
import UnsupportedBrowser from "./UnsupportedBrowser";
import { useVideoCall } from "./queries";

export default function VideoCall() {
  const { data, loading, error } = useVideoCall();

  if (loading) {
    return <Loading />;
  }

  if (isNotFound(error)) {
    return <NotFound />;
  }

  return (
    <UnsupportedBrowser>
      <VideoCallProvider data={data.videoCall}>
        <VideoCallRoom />
      </VideoCallProvider>
    </UnsupportedBrowser>
  );
}
