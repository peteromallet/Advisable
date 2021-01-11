import { theme } from "@advisable/donut";
import styled, { css } from "styled-components";

export const activeTopicStyle = css`
  background-color: ${theme.colors.neutral200};
  color: ${theme.colors.blue700};

  svg {
    color: ${theme.colors.blue700};
  }
`;

export const StyledTopic = styled.a`
  display: flex;
  font-size: 1rem;
  overflow: hidden;
  padding: 10px 12px;
  margin-left: -12px;
  border-radius: 25px;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 0;
  user-select: none;
  color: ${theme.colors.neutral800};

  svg {
    width: 16px;
    height: 16px;
    margin-right: 2px;
    color: ${theme.colors.neutral500};
  }

  &.active {
    ${activeTopicStyle};
  }

  &:hover {
    cursor: pointer;
    transition: background-color 100ms;
    text-decoration: none;
    ${activeTopicStyle}
  }
`;
