import { rgba } from "polished";
import styled, { css } from "styled-components";
import {
  theme,
  Box,
  StyledButton,
  StyledTextarea,
  StyledTextareaControl,
} from "@advisable/donut";
import { GuildBox } from "@guild/styles";

const { colors } = theme;

export const StyledConversationItem = styled(GuildBox)`
  padding: 12px;
  display: flex;
  cursor: pointer;
  border-radius: 12px;
  flex-direction: column;
  margin-bottom: 8px;

  ${({ active }) =>
    active &&
    css`
      background: ${colors.neutral100};
      cursor: default;
    `}
`;

export const StyledComposer = styled(Box)`
  background: white;
  position: relative;
  border-radius: 12px;
  box-shadow: 0 8px 32px -8px ${rgba(colors.neutral900, 0.2)};

  ${StyledButton} {
    right: 12px;
    bottom: 12px;
    position: absolute;
  }

  ${StyledTextarea}, ${StyledTextareaControl} {
    background: white;
    border-radius: 12px;
  }
`;

export const StyledMessage = styled(Box)`
  padding: 16px;
  color: ${colors.catalinaBlue100};
  display: flex;
  border-radius: 12px;
  overflow-wrap: break-word;
`;
