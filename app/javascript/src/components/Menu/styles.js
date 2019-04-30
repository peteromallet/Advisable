import { rgba } from "polished";
import styled from "styled-components";
import { Icon } from "../Icon/styles";
import colors from "../../colors";

export const Menu = styled.div`
`;

export const Trigger = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 6px;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  color: ${colors.neutral.s6};
  appearance: none;
  background: transparent;

  &:hover {
    color: ${colors.neutral.s8};
    background: ${rgba(colors.neutral.s1, 0.5)};
  }
`

export const Item = styled.div`
  display: flex;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  padding: 8px 8px;
  user-select: none;
  align-items: center;
  color: ${colors.neutral.s7};

  ${Icon} {
    margin-right: 4px;
    color: ${colors.neutral.s8};
  }

  &:hover {
    color: ${colors.neutral.s9};
    background: ${rgba(colors.neutral.s1, 0.5)};
  }
`

export const Popout = styled.div`
  z-index: 1;
  padding: 8px 0;
  min-width: 200px;
  max-width: 300px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 4px 60px ${rgba(colors.neutral.s9, 0.25)},
    0 2px 8px ${rgba(colors.neutral.s9, 0.1)};
`;
