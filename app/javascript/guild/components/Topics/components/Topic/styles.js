import { theme } from "@advisable/donut";
import { GuildBox } from "@guild/styles";
import styled, { css } from "styled-components";

export const activeTopicStyle = css`
  background-color: ${theme.colors.lavender};
  color: ${theme.colors.calatlinaBlue50};
`;

export const StyledTopic = styled(GuildBox)`
  padding: 12px 12px;
  margin-left: -8px;
  border-radius: 20px;

  ${({ selected }) => selected && activeTopicStyle}

  &:hover {
    cursor: pointer;
    transition: background-color 220ms;
    text-decoration: none;
    ${activeTopicStyle}
  }
`;
