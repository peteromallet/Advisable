import { rgba } from "polished";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { theme } from "@advisable/donut";

export const StyledNavigationMenuItemNumber = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  font-size: 11px;
  font-weight: 700;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: #c6c6d0;
  background: #f2f2f6;
`;

export const StyledNavigationMenuLink = styled(NavLink)`
  height: 40px;
  display: flex;
  color: inherit;
  font-size: 16px;
  border-radius: 20px;
  align-items: center;
  padding-left: 16px;
  padding-right: 12px;
  letter-spacing: -0.02rem;
  justify-content: space-between;
`;

const StyledNavigationMenuItem_Comlete = css`
  ${StyledNavigationMenuItemNumber} {
    color: white;
    background: #2ebcc0;
  }
`;

const StyledNavigationMenuItem_Disabled = css`
  color: #bbbcc9;

  ${StyledNavigationMenuLink} {
    cursor: default;
  }
`;

const StyledNavigationMenuItem_Enabled = css`
  color: ${theme.colors.neutral500};

  &:hover {
    ${StyledNavigationMenuLink} {
      color: #1e234e;
      background: ${rgba("#f5f5f8", 0.5)};
    }
  }

  ${StyledNavigationMenuLink} {
    &.active {
      color: #1e234e;
      background: #f5f5f8;

      ${StyledNavigationMenuItemNumber} {
        color: #2ebcc0;
        background: white;
      }
    }
  }
`;

export const StyledNavigationMenuItem = styled.div`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
  position: relative;
  color: ${theme.colors.neutral500};
  margin-left: -8px;

  ${(props) => props.isDisabled && StyledNavigationMenuItem_Disabled};
  ${(props) => !props.isDisabled && StyledNavigationMenuItem_Enabled};
  ${(props) => props.isComplete && StyledNavigationMenuItem_Comlete};
`;
