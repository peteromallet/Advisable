import { theme } from "@advisable/donut";
import styled from "styled-components";

export const ComposerButton = styled.button`
  height: 32px;
  border: none;
  cursor: pointer;
  appearance: none;
  border-radius: 16px;
  align-items: center;
  display: inline-flex;

  span {
    padding: 0 8px;
    font-size: 15px;
    font-weight: 500;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  svg {
    width: 20px;
  }
`;

export const StyledSecondaryComposerButton = styled(ComposerButton)`
  color: ${theme.colors.neutral500};
  background: transparent;

  &:not(:disabled):hover {
    color: ${theme.colors.neutral900};
    background: ${theme.colors.neutral100};
  }

  &:not(:disabled):active {
    opacity: 0.8;
  }
`;
