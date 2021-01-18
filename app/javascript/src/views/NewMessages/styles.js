import { rgba } from "polished";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";
import {
  theme,
  Box,
  StyledButton,
  StyledTextarea,
  StyledTextareaControl,
} from "@advisable/donut";

const { colors } = theme;

const StyledConversationItem_Unread = css`
  position: relative;
  padding-right: 50px;
  background: ${colors.blue50};

  &::before {
    content: " ";
    position: absolute;
    top: 50%;
    width: 8px;
    right: 20px;
    height: 8px;
    border-radius: 50%;
    transform: translateY(-50%);
    background: ${colors.blue700};
  }
`;

export const StyledConversationItem = styled(NavLink)`
  padding: 12px;
  display: flex;
  cursor: pointer;
  border-radius: 12px;
  flex-direction: column;
  margin-bottom: 8px;

  &.active {
    background: ${colors.neutral100};
    cursor: default;
  }

  ${(p) => (p.$hasUnread && !p.active ? StyledConversationItem_Unread : null)};
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
