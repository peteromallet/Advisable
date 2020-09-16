import React from "react";
import Room from "./Room";
import NotFound, { isNotFound } from "../NotFound";
import UnsupportedBrowser from "./UnsupportedBrowser";
import { useVideoCall } from "./queries";

export default function VideoCall() {
  const { data, loading, error } = useVideoCall();

  if (loading) {
    return <>loading...</>;
  }

  if (isNotFound(error)) {
    return <NotFound />;
  }

  const { id, accessToken } = data.videoCall;

  return (
    <UnsupportedBrowser>
      <Room roomName={id} accessToken={accessToken} />
    </UnsupportedBrowser>
  );
}
