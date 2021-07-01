import styled, { css } from "styled-components";
import { theme } from "@advisable/donut";

export const StyledToolbar = styled.div`
  padding: 6px;
  margin-bottom: 20px;
  align-items: center;
  border-radius: 12px;
  display: inline-flex;
  background: ${theme.colors.neutral100};
`;

export const StyledEditor = styled.div`
  .DraftEditor-root {
    min-height: 100px;
  }
`;

export const StyledToolbarButtons = styled.div``;

export const StyledToolbarButton_Active = css`
  color: white;
  background: ${theme.colors.neutral800};

  &:hover {
    color: white;
    background: ${theme.colors.neutral900};
  }
`;

export const StyledToolbarButton = styled.button`
  border: none;
  appearance: none;
  width: 36px;
  height: 32px;
  border-radius: 10px;
  margin-right: 2px;
  background: transparent;

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background: ${theme.colors.neutral200};
  }

  &:last-child {
    margin-right: 0;
  }

  ${(p) => p.$active && StyledToolbarButton_Active};
`;
