import React from "react";
import { Box, Icon, theme } from "@advisable/donut";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

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
    <Box bg="white.9" height={50} boxShadow="xs" display="flex">
      <StyledMobileTab
        activeClassName="active"
        to={`/freelancers/${data.specialist.id}/profile`}
      >
        <Icon width={20} icon="user" />
        Profile
      </StyledMobileTab>
      <StyledMobileTab
        activeClassName="active"
        to={`/freelancers/${data.specialist.id}/projects`}
      >
        <Icon width={20} icon="folder" />
        Projects
      </StyledMobileTab>
      <StyledMobileTab
        activeClassName="active"
        to={`/freelancers/${data.specialist.id}/reviews`}
      >
        <Icon width={20} icon="align-left" />
        Reviews
      </StyledMobileTab>
    </Box>
  );
}

export default MobileTabs;
