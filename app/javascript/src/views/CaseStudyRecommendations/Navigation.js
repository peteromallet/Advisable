import React from "react";
import styled from "styled-components";
import { theme, Box } from "@advisable/donut";
import { Inbox } from "@styled-icons/heroicons-solid/Inbox";
import { Archive } from "@styled-icons/heroicons-solid/Archive";
import { NavLink, useParams } from "react-router-dom";

const StyledNavLink = styled(NavLink)`
  margin: 0 4px;
  font-weight: 450;
  padding: 8px 12px;
  border-radius: 12px;
  align-items: center;
  display: inline-flex;
  transition: color 200ms;
  color: ${theme.colors.neutral500};

  svg {
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }

  &:not(.active):hover {
    color: ${theme.colors.neutral700};
  }

  &.active {
    color: ${theme.colors.neutral900};
    background: ${theme.colors.neutral100};
  }
`;

const Count = styled.div`
  color: white;
  height: 20px;
  padding: 0 8px;
  font-size: 12px;
  font-weight: 500;
  margin-left: 8px;
  border-radius: 25px;
  align-items: center;
  display: inline-flex;
  background: ${theme.colors.cyan700};
`;

export default function CaseStudyRecommendationsNavigation({ inboxCount }) {
  const { id } = useParams();

  return (
    <Box display="flex" alignItems="center" justifyContent="center">
      <StyledNavLink to={`/explore/${id}/inbox`}>
        <Inbox />
        Inbox
        {inboxCount > 0 && <Count>{inboxCount}</Count>}
      </StyledNavLink>
      <StyledNavLink to={`/explore/${id}/archived`}>
        <Archive />
        Archive
      </StyledNavLink>
    </Box>
  );
}
