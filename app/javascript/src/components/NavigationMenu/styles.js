import styled from "styled-components";
import { NavLink } from "react-router-dom";
import colors from "../../colors";

export const NavigationMenu = styled.div``;

export const NavigationMenuItem = styled(NavLink)`
  color: ${colors.neutral.s7};
  display: flex;
  font-size: 15px;
  font-weight: 500;
  padding: 8px 10px;
  margin-bottom: 4px;
  margin-left: -10px;
  border-radius: 6px;
  align-items: center;
  text-decoration: none;
  transition: background-color 150ms;

  svg {
    width: 20px;
    height: 20px;
    stroke-width: 2;
    margin-right: 8px;
  }

  &:hover {
    color: ${colors.neutral.s9};
    background: ${colors.neutral.s2};
  }

  &.active {
    color: ${colors.blue.base};
  }
`;
