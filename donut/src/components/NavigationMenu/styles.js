import { rgba } from "polished";
import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import theme from "../../theme";

export const StyledNavigationMenuItemNumber = styled.div`
  width: 24px;
  color: white;
  height: 24px;
  display: flex;
  font-size: 11px;
  font-weight: 700;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral300};
  border: 2px solid ${theme.colors.neutral200};
`;

export const StyledNavigationMenuLink = styled(NavLink)`
  height: 40px;
  display: flex;
  color: inherit;
  font-size: 15px;
  border-radius: 20px;
  align-items: center;
  padding-left: 16px;
  padding-right: 12px;
  justify-content: space-between;
`;

const StyledNavigationMenuItem_Comlete = css`
  ${StyledNavigationMenuItemNumber} {
    color: white;
    background: ${theme.colors.cyan700};
    border-color: ${theme.colors.cyan700};
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
        background: ${theme.colors.cyan900};
        border-color: ${theme.colors.cyan900};
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
