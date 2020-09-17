import React, { useRef, useEffect } from "react";
import styled from "styled-components";

export const StyledVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export default function Video({ track }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    el.muted = true;
    track.attach(el);

    return () => {
      track.detach(el);
    };
  }, [track]);

  return <StyledVideo ref={ref} />;
}
