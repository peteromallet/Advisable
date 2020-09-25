import { rgba } from "polished";
import styled from "styled-components";
import { theme, StyledCard } from "@advisable/donut";

export const StyledAvatarCard = styled(StyledCard)`
  z-index: 4;
  position: relative;
  transition: box-shadow 300ms;
  cursor: pointer;
  box-shadow: 0px 8px 12px -4px ${rgba(theme.colors.neutral900, 0.04)},
    0px 4px 20px -4px ${rgba(theme.colors.neutral900, 0.22)};

  &:hover {
    box-shadow: 0px 12px 24px -12px ${rgba(theme.colors.neutral900, 0.08)},
      0px 24px 40px -24px ${rgba(theme.colors.neutral900, 0.3)};
  }
`;

export const FileUploader = styled.div`
  width: 42px;
  height: 42px;
  display: flex;
  overflow: hidden;
  position: absolute;
  bottom: 12px;
  right: 12px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral700};
  background: ${rgba(theme.colors.neutral100, 0.5)};
  transition: background 0.2s, color 0.2s, opacity 0.2s;
  opacity: 0;

  &:hover {
    color: ${theme.colors.neutral800};
    background: ${rgba(theme.colors.neutral100, 0.7)};
  }
  ${StyledAvatarCard}:hover & {
    opacity: 1;
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
