import React from "react";
import { Switch, Route } from "react-router-dom";
import VideoCallRoom from "./VideoCallRoom";
import VideoCallProvider from "./VideoCallProvider";
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

  return (
    <Switch>
      <Route path="/calls/:id/over">You have left the call</Route>
      <Route>
        <UnsupportedBrowser>
          <VideoCallProvider data={data.videoCall}>
            <VideoCallRoom />
          </VideoCallProvider>
        </UnsupportedBrowser>
      </Route>
    </Switch>
  );
}
