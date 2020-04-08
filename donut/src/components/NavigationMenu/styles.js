import { rgba } from "polished";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import theme from "../../theme";

export const StyledNavigationMenuItem = styled.div``;

export const StyledNavigationMenuLink = styled(NavLink)`
  height: 40px;
  display: flex;
  padding: 0 20px;
  border-radius: 20px;
  align-items: center;
  color: ${theme.colors.neutral500};
  transition: background 150ms;

  &:hover {
    color: ${theme.colors.blue900};
    background: ${rgba(theme.colors.neutral100, 0.4)};
  }
`;
