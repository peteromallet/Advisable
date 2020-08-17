import React from "react";
import { rgba } from "polished";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { theme } from "@advisable/donut";
import { ChevronRight } from "@styled-icons/feather";

export const PrefixIcon = styled.div`
  color: ${theme.colors.neutral500};
  svg {
    width: 20px;
    height: 20px;
    stroke-width: 2.25;
    margin-right: 8px;
  }
`;

export const ArrowIconWrapper = styled.div`
  display: none;
  margin-left: auto;
  color: #a3a3a6;
  svg {
    width: 20px;
    height: 20px;
    stroke-width: 2.25;
    margin-right: -4px;
  }
`;

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

  &:hover {
    color: ${theme.colors.neutral700};
    background: ${rgba(theme.colors.blue50, 0.75)};
  }

  &.active {
    color: ${theme.colors.blue900};
    background: ${theme.colors.blue50};

    ${PrefixIcon} {
      color: ${theme.colors.blue500};
    }
  }
  padding-right: 12px;

  @media (max-width: 900px) {
    height: auto;
    margin-left: 0;
    margin-bottom: 0;
    padding: 16px 0 16px 4px;
    border-radius: 0;
    &:not(:last-child) {
      border-bottom: 1px solid #dbdde6;
    }
    &.active {
      background: none;
      color: ${theme.colors.blue800};
    }
    &:hover {
      color: ${theme.colors.neutral600};
      background: none;
    }
    ${ArrowIconWrapper} {
      display: block;
    }
  }
`;

export const ArrowIcon = () => (
  <ArrowIconWrapper>
    <ChevronRight strokeWidth={2} />
  </ArrowIconWrapper>
);
