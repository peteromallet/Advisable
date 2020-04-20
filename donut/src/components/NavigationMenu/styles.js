import { rgba } from "polished";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import theme from "../../theme";

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
  color: inherit;
  border-radius: 20px;
  align-items: center;
`;

const StyledNavigationMenuItem_Comlete = css`
  ${StyledNavigationMenuItemNumber} {
    color: white;
    background: ${theme.colors.cyan500};
    border-color: ${theme.colors.cyan500};
  }

  &::after {
    background: ${theme.colors.cyan100};
  }
`;

const StyledNavigationMenuItem_Disabled = css`
  color: ${theme.colors.neutral200};

  ${StyledNavigationMenuLink} {
    cursor: default;
  }
`;

const StyledNavigationMenuItem_Enabled = css`
  color: ${theme.colors.neutral500};

  &:hover {
    ${StyledNavigationMenuLink} {
      color: ${theme.colors.neutral700};
      background: ${rgba(theme.colors.blue50, 0.75)};
    }
  }

  ${StyledNavigationMenuLink} {
    &.active {
      color: ${theme.colors.blue900};
      background: ${theme.colors.blue50};

      ${StyledNavigationMenuItemNumber} {
        color: white;
        background: ${theme.colors.cyan500};
        border-color: ${theme.colors.cyan500};
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

  &::after {
    content: "";
    width: 2px;
    height: 20px;
    position: absolute;
    top: 32px;
    left: 19px;
    z-index: -1;
    background: ${theme.colors.neutral50};
  }

  &:last-child&::after {
    display: none;
  }

  ${(props) => props.isDisabled && StyledNavigationMenuItem_Disabled};
  ${(props) => !props.isDisabled && StyledNavigationMenuItem_Enabled};
  ${(props) => props.isComplete && StyledNavigationMenuItem_Comlete};
`;
