import { lighten } from "polished";
import styled, { css } from "styled-components";
import colors from "../../colors";

const activeStyling = css`
  color: ${colors.blue.base};
  background: ${lighten(0.4, colors.blue.base)};

  &:hover {
    color: ${colors.blue.base};
    background: ${lighten(0.3, colors.blue.base)};
  }
`;

export const IconButton = styled.button`
  width: 32px;
  height: 32px;
  border: none;
  outline: none;
  appearance: none;
  border-radius: 5px;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  color: ${colors.neutral.s7};
  background: ${colors.neutral.s1};
  transition: background-color 200ms;

  svg {
    width: 18px;
    height: 18px;
    stroke-width: 2;
  }

  &:hover {
    cursor: pointer;
    color: ${colors.neutral.s8};
    background: ${colors.neutral.s2};
  }

  ${props => props.active && activeStyling}
`;
