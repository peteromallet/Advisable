import React, { useContext } from "react";
import { useParams, NavLink } from "react-router-dom";
import { theme } from "@advisable/donut";
import styled from "styled-components";
import { useResources } from "../resources";

const StyledTableNavigation = styled.div``;

const StyledTableNavigationTabBar = styled.div`
  padding: 24px 16px 0 16px;
  background: ${theme.colors.neutral800};
`;

const StyledTableNavigationLink = styled(NavLink)`
  font-size: 16px;
  padding: 6px 12px;
  margin-right: 8px;
  display: inline-block;
  font-weight: 600;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  color: rgba(255, 255, 255, 0.8);
  background: ${theme.colors.neutral700};

  &.active {
    background: white;
    color: ${theme.colors.blue800};
  }
`;

const StyledToolbar = styled.div`
  height: 40px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export default function TableNavigation() {
  const resources = useResources();

  return (
    <StyledTableNavigation>
      <StyledTableNavigationTabBar>
        {resources.map((r) => (
          <StyledTableNavigationLink key={r.name} to={`/${r.name}`}>
            {r.name}
          </StyledTableNavigationLink>
        ))}
      </StyledTableNavigationTabBar>
      <StyledToolbar />
    </StyledTableNavigation>
  );
}
