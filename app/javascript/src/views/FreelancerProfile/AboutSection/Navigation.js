import React from "react";
import styled from "styled-components";
import { Box, theme } from "@advisable/donut";
import { NavLink, useParams } from "react-router-dom";

export const StyledNavigation = styled(Box)`
  border-top: 1px solid ${theme.colors.neutral100};
`;

export const StyledNavLink = styled(NavLink)`
  font-size: 18px;
  margin-right: 24px;
  display: inline-flex;
  letter-spacing: -0.02rem;
  padding: 18px 4px 16px 4px;
  color: ${theme.colors.neutral600};
  border-bottom: 2px solid transparent;

  &:hover {
    color: ${theme.colors.neutral900};
    border-bottom-color: ${theme.colors.neutral300};
  }

  &.active {
    color: ${theme.colors.blue500};
    border-bottom-color: ${theme.colors.blue500};
  }
`;

export default function ProfileNavigation() {
  const { id } = useParams();

  return (
    <StyledNavigation paddingLeft="xl">
      <StyledNavLink to={`/freelancers/${id}`} exact>
        Profile
      </StyledNavLink>
      <StyledNavLink to={`/freelancers/${id}/guild`}>Guild</StyledNavLink>
    </StyledNavigation>
  );
}
