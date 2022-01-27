import React from "react";
import { darken } from "polished";
import styled, { css } from "styled-components";
import { theme } from "@advisable/donut";

export const StyledRadioInput = styled.input`
  clip: rect(0px, 0px, 0px, 0px);
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0px;
  overflow: hidden;
  border-width: 0px;
  position: absolute;
  white-space: nowrap;
  border-style: initial;
  border-color: initial;
  border-image: initial;
`;

export const StyledRadioToggle = styled.div`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  position: relative;
  border-radius: 50%;
  box-sizing: border-box;
  border: 2px solid ${theme.colors.neutral300};
  transition: background 200ms;

  &::before {
    top: 4px;
    left: 4px;
    content: "";
    width: 12px;
    height: 12px;
    position: absolute;
    border-radius: 50%;
    box-sizing: border-box;
    background: ${theme.colors.blue400};
    transform: scale(0);
    transition: transform 200ms;
  }
`;

export const StyledRadioContent = styled.div`
  padding-left: 12px;
`;

export const StyledRadioLabel = styled.div`
  font-size: 18px;
  font-weight: 560;
  line-height: 20px;
  margin-bottom: 4px;
  letter-spacing: -0.02em;
  color: ${theme.colors.neutral900};
`;

export const StyledRadioDescription = styled.div`
  font-size: 16px;
  line-height: 20px;
  color: ${theme.colors.neutral800};
`;

const disabledStyles = css`
  cursor: default;

  ${StyledRadioToggle}, ${StyledRadioLabel}, ${StyledRadioDescription} {
    opacity: 0.5;
  }
`;

const notDisabledStyles = css`
  cursor: pointer;

  &:hover ${StyledRadioInput}:not(:checked) + ${StyledRadioToggle} {
    background: ${darken(0.015, theme.colors.neutral100)};
    border: 2px solid ${darken(0.025, theme.colors.neutral300)};
  }

  ${StyledRadioInput}:checked + ${StyledRadioToggle} {
    border-color: ${theme.colors.blue500};

    &:before {
      transform: scale(1);
    }
  }

  &:hover ${StyledRadioInput}:checked + ${StyledRadioToggle} {
    border-color: ${theme.colors.blue600};
  }
`;

export const StyledRadio = styled.label`
  display: flex;
  padding: 20px;
  border-radius: 20px;
  user-select: none;
  align-items: center;
  border: 2px solid ${theme.colors.neutral100};

  &[aria-checked="true"] {
    border-color: ${theme.colors.blue500};
  }

  ${(props) => (props.disabled ? disabledStyles : notDisabledStyles)};
`;

export default function RadioOption({
  children,
  label,
  description,
  ...props
}) {
  return (
    <StyledRadio disabled={props.disabled} aria-checked={props.checked}>
      <StyledRadioInput
        {...props}
        role="radio"
        type="radio"
        aria-checked={props.checked}
      />
      <StyledRadioToggle aria-hidden="true" />
      <StyledRadioContent>
        <StyledRadioLabel>{label}</StyledRadioLabel>
        {description && (
          <StyledRadioDescription>{description}</StyledRadioDescription>
        )}
        {children}
      </StyledRadioContent>
    </StyledRadio>
  );
}
