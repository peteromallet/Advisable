import { rgba } from "polished";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { theme } from "@advisable/donut";

export const StyledNavigationMenuItem = styled(NavLink)`
  height: 40px;
  display: flex;
  color: inherit;
  font-size: 16px;
  font-weight: 500;
  border-radius: 20px;
  align-items: center;
  padding-left: 16px;
  margin-bottom: 4px;
  margin-left: -8px;
  color: ${theme.colors.neutral500};

  svg {
    width: 20px;
    height: 20px;
    stroke-width: 2.25;
    margin-right: 8px;
  }

  &:hover {
    color: ${theme.colors.neutral700};
    background: ${rgba(theme.colors.blue50, 0.75)};
  }

  &.active {
    color: ${theme.colors.blue900};
    background: ${theme.colors.blue50};

    svg {
      color: ${theme.colors.blue500};
    }
  }
  padding-right: 12px;
`;
