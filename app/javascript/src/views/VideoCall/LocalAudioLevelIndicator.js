import React from "react";
import useCallContext from "./useCallContext";
import AudioLevelIndicator from "./AudioLevelIndicator";

export default function LocalAudioLevelIndicator() {
  const { localTracks } = useCallContext();
  const audioTrack = localTracks.find((track) => track.kind === "audio");

  return <AudioLevelIndicator audioTrack={audioTrack} />;
}
