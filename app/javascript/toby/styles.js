import { NavLink } from "react-router-dom";
import { theme } from "@advisable/donut";
import { rgba } from "polished";
import styled, { createGlobalStyle } from "styled-components";

const HEADER_HEIGHT = 105;

export const BaseStyles = createGlobalStyle`
  body {
    background: white !important;
    padding-top: ${HEADER_HEIGHT}px;
    overscroll-behavior-y: none;
  }
`;

export const StyledHeader = styled.div`
  top: 0;
  left: 0;
  min-width: 100vw;
  position: fixed;
  background: white;
  height: ${HEADER_HEIGHT}px;
  box-shadow: 0 2px 4px ${rgba(theme.colors.neutral900, 0.16)},
    0 1px 2px ${rgba(theme.colors.neutral900, 0.08)};
`;

export const StyledHeaderRow = styled.div`
  display: flex;
  background-color: ${theme.colors.neutral50};
`;

export const StyledHeaderCell = styled.div`
  width: 200px;
  height: 36px;
  display: flex;
  padding: 0 10px;
  font-size: 15px;
  overflow: hidden;
  font-weight: 500;
  white-space: nowrap;
  align-items: center;
  color: ${theme.colors.neutral700};
  border-right: 1px solid ${theme.colors.neutral200};
`;

export const StyledRow = styled.div`
  display: flex;
  border-bottom: 1px solid #ccc;

  &:hover {
    cursor: pointer;
    background: ${theme.colors.neutral50};
  }
`;

export const StyledCell = styled.div`
  width: 200px;
  height: 40px;
  display: flex;
  font-size: 15px;
  padding: 0 10px;
  flex-shrink: 0;
  overflow: hidden;
  white-space: nowrap;
  align-items: center;
  border-right: 1px solid #ccc;
`;

export const StyledNavigation = styled.div`
  background: #ddd;
  padding: 20px 20px 0 20px;
`;

export const StyledNavLink = styled(NavLink)`
  font-size: 16px;
  padding: 6px 12px;
  background: white;
  margin-right: 4px;
  display: inline-block;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;
