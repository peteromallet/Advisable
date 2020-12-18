import React from "react";
import { margin } from "styled-system";
import styled from "styled-components";
import { SwitchHorizontal } from "@styled-icons/heroicons-outline";

export const StyledGuildToggle = styled.a`
  ${margin};

  color: white;
  flex-shrink: 0;
  min-width: 0;
  cursor: pointer;
  font-size: 15px;
  font-weight: 400;
  padding: 8px 12px;
  border-radius: 8px;
  align-items: center;
  display: inline-flex;
  text-decoration: none;
  white-space: nowrap;
  letter-spacing: -0.01rem;
  background: rgba(255, 255, 255, 0.16);

  svg {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.24);
  }
`;

export default function GuildToggle({ children, url, ...props }) {
  return (
    <StyledGuildToggle href={url} {...props}>
      <SwitchHorizontal />
      {children}
    </StyledGuildToggle>
  );
}
