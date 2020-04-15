import { rgba } from "polished";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import theme from "../../theme";

export const StyledNavigationMenuItem = styled.div``;

export const StyledNavigationMenuItemPrefix = styled.div`
  width: 40px;
  height: 40px;
  align-items: center;
  display: inline-flex;
  justify-content: center;
`;

export const StyledNavigationMenuItemNumber = styled.div`
  width: 24px;
  color: white;
  height: 24px;
  display: flex;
  font-size: 12px;
  font-weight: 700;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral200};
  border: 2px solid ${theme.colors.neutral100};
`;

export const StyledNavigationMenuLink = styled(NavLink)`
  height: 40px;
  display: flex;
  border-radius: 20px;
  align-items: center;
  color: ${theme.colors.neutral500};
  transition: background 150ms;

  &:hover {
    color: ${theme.colors.blue900};
    background: ${rgba(theme.colors.neutral100, 0.4)};
  }

  &.active {
    color: ${theme.colors.blue900};

    ${StyledNavigationMenuItemNumber} {
      color: white;
      background: ${theme.colors.cyan500};
      border-color: ${theme.colors.cyan500};
    }
  }
`;
