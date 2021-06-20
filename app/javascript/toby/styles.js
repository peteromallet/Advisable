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
  user-select: none;
  position: relative;
`;

export const StyledCurrentResource = styled.div`
  padding: 16px;
  font-size: 24px;
  cursor: pointer;
  font-weight: 500;
  align-items: center;
  display: inline-flex;
  letter-spacing: -0.02rem;
  color: ${theme.colors.neutral900};

  svg {
    height: 20px;
    margin-right: 8px;
  }

  span {
    margin-top: -3px;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const StyledResourceMenu = styled.div`
  z-index: 10;
  width: 320px;
  left: 20px;
  background: white;
  max-height: 400px;
  border-radius: 12px;
  overflow-y: scroll;
  box-shadow: 0 12px 56px -12px rgba(0, 0, 0, 0.28), 0 0 4px rgba(0, 0, 0, 0.04);
`;

export const StyledResourceLink = styled(NavLink)`
  display: flex;
  font-size: 16px;
  padding: 8px 12px;
  align-items: center;
  color: ${theme.colors.neutral700};

  &:hover {
    background: ${theme.colors.neutral50};
  }

  svg {
    height: 16px;
    margin-right: 8px;
    color: ${theme.colors.neutral400};
  }

  span {
    margin-top: -3px;
  }
`;
