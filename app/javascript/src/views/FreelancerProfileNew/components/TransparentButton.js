import React from "react";
import styled from "styled-components";
import { rgba } from "polished";
import { theme } from "@advisable/donut";
import { position } from "styled-system";

export const StyledButton = styled.div`
  ${position}

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
  opacity: 1;

  &:hover {
    color: ${rgba(theme.colors.blue100, 1)};
    background: ${rgba(theme.colors.neutral700, 0.6)};
  }
`;

function TransparentButton({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

TransparentButton.Styled = StyledButton;

export default TransparentButton;
