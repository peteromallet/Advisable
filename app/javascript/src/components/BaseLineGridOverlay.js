import React, { useEffect, useState } from "react";
import { theme } from "@advisable/donut";
import styled, { css } from "styled-components";

const horizontal = css`
  background-image: linear-gradient(
    to bottom,
    ${theme.colors.cyan600} 1px,
    transparent 1px
  );
`;

const veritcal = css`
  background-image: linear-gradient(
    to right,
    ${theme.colors.cyan600} 1px,
    transparent 1px
  );
`;

const StyledBaselineGridOverlay = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  z-index: 999999;
  opacity: ${(p) => p.$opacity / 10};
  background-size: ${(p) => `${p.$size}px ${p.$size}px`};
  ${(p) => (p.$axis === "HORIZONTAL" ? horizontal : veritcal)};
`;

const NUMBER_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

export default function BaseLineGridOverlay() {
  const [visible, setVisible] = useState(false);
  const [axis, setAxis] = useState("HORIZONTAL");
  const [size, setSize] = useState(4);
  const [opacity, setOpacity] = useState(8);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === "KeyG" && e.shiftKey && e.ctrlKey) {
        e.preventDefault();
        setVisible(!visible);
      }

      if (visible && e.key === "]") {
        e.preventDefault();
        setSize(size + 4);
      }

      if (visible && e.key === "[") {
        e.preventDefault();
        setSize(Math.abs(size - 4) || 4);
      }

      if (visible && e.key === "h") {
        e.preventDefault();
        setAxis("HORIZONTAL");
      }

      if (visible && e.key === "v") {
        e.preventDefault();
        setAxis("VERITCAL");
      }

      if (visible && NUMBER_KEYS.includes(e.key)) {
        e.preventDefault();
        setOpacity(Number(e.key));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  });

  if (!visible) return null;

  return (
    <StyledBaselineGridOverlay $opacity={opacity} $axis={axis} $size={size} />
  );
}
