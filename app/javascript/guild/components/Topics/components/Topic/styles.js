import { theme } from "@advisable/donut";
import { GuildBox } from "@guild/styles";
import styled, { css } from "styled-components";

export const activeTopicStyle = css`
  background-color: ${theme.colors.lavender};
  color: ${theme.colors.calatlinaBlue50};
`;

export const StyledTopic = styled(GuildBox)`
  padding: 6px 14px;
  border-radius: 15px;

  ${({ selected }) => selected && activeTopicStyle}

  &:hover {
    cursor: pointer;
    border-radius: 15px;
    transition: background-color 220ms;
    text-decoration: none;
    ${activeTopicStyle}
  }
`;
