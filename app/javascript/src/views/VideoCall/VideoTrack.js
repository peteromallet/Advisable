import React, { useRef, useEffect } from "react";
import { theme } from "@advisable/donut";
import styled from "styled-components";

export const StyledVideo = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: red;
  overflow: hidden;
  align-items: center;
  border-radius: 12px;
  justify-content: center;
  color: ${theme.colors.neutral200};
  background: ${theme.colors.neutral800};

  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export default function Video({ track }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!track) return;

    const el = ref.current;
    el.muted = true;
    track.attach(el);

    return () => {
      track.detach(el);
    };
  }, [track]);

  return (
    <StyledVideo>
      {track ? <video ref={ref} /> : <span>Camera is off</span>}
    </StyledVideo>
  );
}
