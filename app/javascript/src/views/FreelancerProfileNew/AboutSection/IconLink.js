import React from "react";
import { Link, Circle, theme } from "@advisable/donut";
import { rgba } from "polished";
import styled from "styled-components";

const StyledCircle = styled(Circle)`
  transition: color 0.2s, background 0.2s;
  color: ${rgba(theme.colors.neutral700, 0.9)};
  background: ${rgba(theme.colors.neutral200, 0.9)};
  &:hover {
    background: ${rgba(theme.colors.neutral200, 0.8)};
    color: ${rgba(theme.colors.neutral700, 0.7)};
  }
`;

function IconLink({ Icon, url, strokeWidth }) {
  return (
    <Link.External href={url} mx="xxs" target="_blank">
      <StyledCircle size={42}>
        <Icon size={24} strokeWidth={strokeWidth} />
      </StyledCircle>
    </Link.External>
  );
}

export default IconLink;
