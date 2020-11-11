import React from "react";
import { darken, rgba } from "polished";
import styled, { css } from "styled-components";
import { theme, StyledCircle } from "@advisable/donut";

export const StyledRadioOption_Checked = css`
  border: 2px solid ${theme.colors.neutral800};
`;

export const StyledRadioOption = styled.div`
  width: 100%;
  position: relative;
  padding: 40px 20px;
  border-radius: 12px;
  text-align: center;
  border: 2px solid transparent;
  background: ${theme.colors.neutral100};
  ${(p) => p.$checked && StyledRadioOption_Checked};

  &:hover {
    background: ${darken(0.01, theme.colors.neutral100)};

    ${StyledCircle} {
      box-shadow: 0 2px 8px ${rgba(theme.colors.neutral900, 0.1)};
    }
  }

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  input {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0;
    padding: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    appearance: none;
    position: absolute;
  }
`;

export default function PostType({ children, ...props }) {
  return (
    <StyledRadioOption $checked={props.checked}>
      <input type="radio" {...props} />
      {children}
    </StyledRadioOption>
  );
}
