import { NavLink } from "react-router-dom";
import { theme } from "@advisable/donut";
import { rgba } from "polished";
import styled, { createGlobalStyle } from "styled-components";

const HEADER_HEIGHT = 100;

export const BaseStyles = createGlobalStyle`
  body {
    background: white !important;
  }
`;

export const StyledLayout = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`;

export const StyledHeader = styled.div`
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  flex-grow: 0;
  flex-shrink: 0;
  min-width: 100vw;
  position: sticky;
  height: ${HEADER_HEIGHT}px;
  background: white;
  box-shadow: 0 1px 2px ${rgba(theme.colors.neutral900, 0.16)};
`;

export const StyledViewport = styled.div`
  display: flex;
  height: calc(100vh - ${HEADER_HEIGHT}px);
`;

export const StyledScrollContainer = styled.div`
  height: 100%;
  min-width: 0;
  width: ${(p) => (p.$filterOpen ? "calc(100vw - 400px)" : "100vw")};
  overflow-y: scroll;
`;

export const StyledHeaderRow = styled.div`
  top: 0px;
  display: flex;
  position: sticky;
  flex-wrap: nowrap;
  white-space: nowrap;
  background-color: ${theme.colors.neutral50};
  box-shadow: 0 2px 4px ${rgba(theme.colors.neutral900, 0.16)},
    0 1px 2px ${rgba(theme.colors.neutral900, 0.08)};
`;

export const StyledHeaderCell = styled.div`
  width: 200px;
  height: 36px;
  display: inline-flex;
  flex-shrink: 0;
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
