import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { theme } from "@advisable/donut";

export const StyledNavigationProgress = styled.path`
  opacity: 0;
  stroke: ${theme.colors.cyan600};
`;

export const StyledNavigationMenuItemNumber = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  font-size: 11px;
  font-weight: 700;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral300};
  border: 2px solid ${theme.colors.neutral300};
`;

export const StyledNavigationMenuLink = styled(NavLink)`
  height: 44px;
  display: flex;
  color: inherit;
  font-size: 16px;
  border-radius: 20px;
  align-items: center;
  letter-spacing: -0.03rem;
  justify-content: space-between;
`;

const StyledNavigationMenuItem_Complete = css`
  color: ${theme.colors.neutral500};

  ${StyledNavigationMenuItemNumber} {
    color: white !important;
    background: #2ebcc0 !important;
    border-color: #2ebcc0 !important;
  }
`;

const StyledNavigationMenuItem_Disabled = css`
  color: ${theme.colors.neutral400};

  ${StyledNavigationMenuLink} {
    cursor: default;
    ${StyledNavigationMenuItemNumber} {
      color: ${theme.colors.neutral300};
      background: transparent;
      border: 2px solid ${theme.colors.neutral300};
    }
  }
`;

const StyledNavigationMenuItem_Enabled = css`
  color: ${theme.colors.neutral500};

  &:hover {
    ${StyledNavigationMenuLink} {
      color: ${theme.colors.blue900};
    }
  }

  ${StyledNavigationMenuLink} {
    &.active {
      color: ${theme.colors.blue900};

      ${StyledNavigationProgress} {
        opacity: 1;
      }

      ${StyledNavigationMenuItemNumber} {
        color: ${theme.colors.neutral300};
        border: 2px solid ${theme.colors.neutral300};
      }
    }
  }
`;

export const StyledNavigationMenuItem = styled.div`
  border-bottom: 1px solid ${theme.colors.neutral100};
  font-size: 16px;
  font-weight: 500;
  padding-bottom: 2px;
  padding-top: 2px;
  position: relative;
  user-select: none;
  color: ${theme.colors.neutral500};

  ${(props) => props.isDisabled && StyledNavigationMenuItem_Disabled};
  ${(props) => !props.isDisabled && StyledNavigationMenuItem_Enabled};
  ${(props) => props.isComplete && StyledNavigationMenuItem_Complete};

  &:last-child {
    border-bottom: none;
  }
`;

export const StyledNavigationMenuItemSteps = styled.div`
  margin: 16px 16px;
  padding-left: 4px;
  border-left: 1px solid ${theme.colors.neutral100};
`;

const StyledNavigationMenuItemStep_Disabled = css`
  opacity: 0.6;
  cursor: default;
`;

export const StyledNavigationMenuItemStep = styled.span`
  padding: 4px;
  display: block;
  margin: 12px 8px;
  font-size: 15px;
  letter-spacing: -0.01rem;
  color: ${theme.colors.neutral600};

  &.active {
    color: ${theme.colors.blue900};
  }

  ${(p) => p.$isDisabled && StyledNavigationMenuItemStep_Disabled};
`;
