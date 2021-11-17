import React from "react";
import { Popover } from "reakit/Popover";
import { Box, theme } from "@advisable/donut";
import styled from "styled-components";

export const StyledDropdown = styled(Box)`
  outline: none;
  background: white;
  overflow: hidden;
  border-radius: 16px;
  box-shadow: 0 20px 40px -12px ${theme.colors.neutral900}24,
    0 2px 8px ${theme.colors.neutral900}12;
`;

export default function MeatballMenu({ popover, children }) {
  return (
    <Popover {...popover} aria-label="Edit a case study">
      <StyledDropdown>{children}</StyledDropdown>
    </Popover>
  );
}
