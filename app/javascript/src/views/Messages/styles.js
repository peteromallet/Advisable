import { theme } from "@advisable/donut";
import styled from "styled-components";

export const ComposerButton = styled.button`
  height: 32px;
  border: none;
  cursor: pointer;
  appearance: none;
  border-radius: 16px;
  display: inline-flex;
  padding: 0 12px;
  place-items: center;

  span {
    font-size: 15px;
    font-weight: 500;
  }

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  svg {
    width: 20px;
    margin-right: 4px;
  }
`;

export const StyledSecondaryComposerButton = styled(ComposerButton)`
  color: ${theme.colors.neutral700};
  background: ${theme.colors.neutral100};

  &:not(:disabled):hover {
    color: ${theme.colors.neutral900};
    background: ${theme.colors.neutral100};
  }

  &:not(:disabled):active {
    opacity: 0.8;
  }
`;
