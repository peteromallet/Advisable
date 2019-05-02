import styled from "styled-components";
import colors from "../../colors";

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
`