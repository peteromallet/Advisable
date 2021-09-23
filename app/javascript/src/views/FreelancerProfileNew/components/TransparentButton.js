import React from "react";
import { Camera } from "@styled-icons/feather/Camera";
import styled from "styled-components";
import { rgba } from "polished";
import { theme } from "@advisable/donut";

export const StyledButton = styled.div`
  width: 42px;
  height: 42px;
  display: flex;
  overflow: hidden;
  position: absolute;
  bottom: 16px;
  right: -8px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: white;
  background: ${rgba(theme.colors.neutral200, 0.4)};
  backdrop-filter: blur(8px);
  border: 1px solid;
  border-color: ${theme.colors.neutral300};
  transition: background 0.2s, color 0.2s, opacity 0.2s;
  opacity: 0;

  &:hover {
    color: ${rgba(theme.colors.blue100, 1)};
    background: ${rgba(theme.colors.neutral700, 0.6)};
  }

  input {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    cursor: pointer;
    position: absolute;
  }
`;

export default function TransparentButton(props) {
  return (
    <StyledButton {...props}>
      <Camera size={20} strokeWidth={2} />
    </StyledButton>
  );
}
