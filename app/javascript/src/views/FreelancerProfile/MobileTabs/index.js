import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Box, theme } from "@advisable/donut";
import { User, Folder, AlignLeft } from "@styled-icons/feather";

const StyledMobileTab = styled(NavLink)`
  width: 100%;
  height: 100%;
  font-size: 15px;
  font-weight: 500;
  padding-left: 24px;
  align-items: center;
  display: inline-flex;
  text-decoration: none;
  letter-spacing: -0.01em;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
  color: ${theme.colors.neutral600};

  &.active {
    color: ${theme.colors.blue600};
    border-bottom: 2px solid ${theme.colors.blue600};
  }

  svg {
    margin-right: 8px;
  }
`;

function MobileTabs({ data }) {
  return (
    <Box bg="white" height={50} boxShadow="xs" display="flex">
      <StyledMobileTab
        activeClassName="active"
        to={`/freelancers/${data.specialist.id}/profile`}
      >
        <User size={20} strokeWidth={2} />
        Profile
      </StyledMobileTab>
      <StyledMobileTab
        activeClassName="active"
        to={`/freelancers/${data.specialist.id}/projects`}
      >
        <Folder size={20} strokeWidth={2} />
        Projects
      </StyledMobileTab>
      <StyledMobileTab
        activeClassName="active"
        to={`/freelancers/${data.specialist.id}/reviews`}
      >
        <AlignLeft size={20} strokeWidth={2} />
        Reviews
      </StyledMobileTab>
    </Box>
  );
}

export default MobileTabs;
