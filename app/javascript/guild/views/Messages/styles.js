import styled, { css } from "styled-components";
import { theme, Box } from "@advisable/donut";
import { GuildBox } from "@guild/styles";

const { colors } = theme;

export const StyledConversationItem = styled(GuildBox)`
  /* max-height: 80px; */
  background: white;
  display: flex;
  flex-direction: column;
  border-left: 3px solid transparent;
  cursor: pointer;
  padding: 8px 16px 24px 16px;

  ${({ active }) =>
    active &&
    css`
      border-left: 3px solid ${colors.slateBlue};
      background: ${colors.lavender};
      cursor: default;
    `}
`;

export const StyledMessage = styled(Box)`
  padding: 16px;
  color: ${colors.catalinaBlue100};
  display: flex;
  border-radius: 12px;
  overflow-wrap: break-word;
`;
