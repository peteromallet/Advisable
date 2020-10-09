import { useEffect, useRef } from "react";

export default function AudioTrack({ track }) {
  const audioEl = useRef();

  useEffect(() => {
    audioEl.current = track.attach();
    audioEl.current.setAttribute("data-cy-audio-track-name", track.name);
    document.body.appendChild(audioEl.current);
    return () => track.detach().forEach((el) => el.remove());
  }, [track]);

  return null;
}
