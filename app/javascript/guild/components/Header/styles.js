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
  height: 36px;
  padding: 0 12px;
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

export const StyledHeaderBadgeNumber = styled(StyledHeaderBadge)`
  width: 16px;
  height: 16px;
  margin-left: -7px;
  color: ${theme.colors.neutral100};
  font-size: 12px;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const NavIcon = styled.div`
  outline: none;
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
    width: 24px;
    height: 24px;
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

export const StyledCurrentUser = styled.div`
  outline: none;
  display: flex;
  font-size: 15px;
  padding: 4px 8px;
  user-select: none;
  align-items: center;
  --arrow-color: ${rgba(theme.colors.blue100, 0.8)};

  &:hover {
    --arrow-color: white;
  }
`;

export const StyledCurrentUserArrow = styled.div`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid var(--arrow-color);
`;

export const StyledCurrentUserMenu = styled(Box)`
  right: 0;
  overflow-y: scroll;
  outline: none;
  padding: 8px 0;
  background: white;
  position: absolute;
  border-radius: 12px;
  box-shadow: 0 8px 32px -8px ${rgba(theme.colors.neutral900, 0.3)};
`;

export const StyledCurrentUserMenuItem = styled.div`
  outline: none;
  display: block;
  font-size: 15px;
  padding: 8px 16px;
  user-select: none;
  color: ${theme.colors.neutral800};

  &:focus {
    background: ${theme.colors.neutral100};
  }
`;

export const StyledHamburger = styled.button`
  padding: 0;
  width: 20px;
  border: none;
  opacity: 0.8;
  outline: none;
  display: block;
  appearance: none;
  margin-right: 12px;
  background: transparent;

  &:active {
    opacity: 1;
  }

  div {
    width: 100%;
    height: 2px;
    background: white;
    border-radius: 1px;
    margin-bottom: 5px;
  }

  div:last-child {
    margin-bottom: 0;
  }
`;
