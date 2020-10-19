import React from "react";
import useTrack from "./useTrack";
import VideoTrack from "./VideoTrack";
import AudioTrack from "./AudioTrack";

export default function Publication({ publication }) {
  const track = useTrack(publication);

  if (!track) return null;

  switch (track.kind) {
    case "video":
      return <VideoTrack track={track} />;
    case "audio":
      return <AudioTrack track={track} />;
    default:
      return null;
  }
}
