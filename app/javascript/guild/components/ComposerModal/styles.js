import styled, { css } from "styled-components";
import { GuildBox } from "@guild/styles";
import { theme } from "@advisable/donut";

export const ComposerBoxOption = styled(GuildBox)`
  height: 135px;
  width: 135px;
  background-color: #f5f6fb;
  padding: 14px;
  text-align: center;
  cursor: pointer;
  border-radius: 8px;
  border: 2px solid transparent;
  box-sizing: border-box;

  svg {
    fill: ${theme.colors.blue900};
  }

  :hover {
    opacity: 0.8;
  }

  ${({ selected }) =>
    selected &&
    css`
      border: 2px solid ${theme.colors.catalinaBlue100};
    `}
`;

export const StyledTopicable = styled.button`
  display: inline-flex;
  flex-shrink: 0;
  background: ${theme.colors.neutral100};
  padding: 8px;
  text-align: center;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  color: #2b2d5f;
  border: none;
  outline: none;
  font-size: 16px;

  &:hover {
    cursor: ${(props) => (props.selectable ? "pointer" : "default")};
  }

  &[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    color: #a2a3c0;
  }
`;
