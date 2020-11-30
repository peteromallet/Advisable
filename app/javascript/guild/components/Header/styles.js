import { rgba } from "polished";
import { position } from "styled-system";
import styled, { css } from "styled-components";
import { theme, Box } from "@advisable/donut";

export const StyledHeader = styled(Box)`
  z-index: 5;
  height: 58px;
  width: 100%;
  color: white;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: space-between;
  background: ${theme.colors.blue800};
  box-shadow: 0 1px 2px ${rgba(theme.colors.neutral900, 0.3)};
`;

export const StyledHeaderLink = styled.a`
  color: ${rgba(theme.colors.blue100, 0.6)};
  align-items: center;
  display: inline-flex;
  padding: 6px 12px;
  border-radius: 12px;
  margin-right: 8px;
  position: relative;

  &:hover {
    color: white;
    opacity: 1;
  }

  &.active {
    opacity: 1;
    color: white;
    background: ${rgba("#FFF", 0.1)};
  }

  svg {
    width: 24px;
    height: 24px;
    margin-right: 6px;
  }
`;

export const StyledHeaderBadge = styled.div`
  ${position};

  width: 8px;
  height: 8px;
  border-radius: 50%;
  position: absolute;
  background: ${theme.colors.froly100};
`;

export const NavIcon = styled.div`
  position: relative;
  ${({ unread }) =>
    unread &&
    css`
      &:after {
        content: "";
        position: absolute;
        background: ${theme.colors.froly100};
        border-radius: 50%;
        right: -2px;
        padding: 6px;
      }
    `}

  ${({ open }) =>
    open &&
    css`
      svg {
        fill: ${theme.colors.purpleBlue} !important;
      }
    `}
  
  svg {
    width: 28px;
    height: 28px;
    fill: white;
  }
  &:hover,
  &:active {
    cursor: pointer;
    svg {
      fill: ${theme.colors.purpleBlue};
    }
  }
`;
