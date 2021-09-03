import React from "react";
import styled from "styled-components";

export const StyledHeaderButton = styled.button`
  height: 32px;
  border: none;
  color: #464340;
  font-size: 15px;
  appearance: none;
  background: #f4f3f3;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  padding: 0 12px;
  cursor: pointer;
  font-weight: 450;
  font-family: TTHoves, sans-serif;
  margin-left: 8px;

  &:hover {
    color: #101114;
    background: #f1f1f0;
  }

  svg {
    margin-right: 6px;
  }

  span {
    margin-top: -1px;
    align-items: center;
    display: inline-flex;
  }
`;

export const StyledHeaderButtonGroup = styled.div`
  ${StyledHeaderButton} {
    margin-left: 1px;
    border-radius: 0;

    &:first-child {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }

    &:last-child {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }
`;

export default function HeaderButton({ icon, children, ...props }) {
  return (
    <StyledHeaderButton {...props}>
      {React.createElement(icon, { size: 20 })}
      <span>{children}</span>
    </StyledHeaderButton>
  );
}
