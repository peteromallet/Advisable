import React from "react";
import { Link, Circle, theme } from "@advisable/donut";
import { rgba } from "polished";
import styled from "styled-components";

const StyledCircle = styled(Circle)`
  transition: color 0.2s, background 0.2s;
  &:hover {
    background: ${rgba(theme.colors.neutral100, 0.95)};
    color: ${rgba(theme.colors.neutral600, 0.8)};
  }
`;

function IconLink({ Icon, url, strokeWidth }) {
  return (
    <Link.External href={url} mx="xxs" target="_blank">
      <StyledCircle size={42} bg="neutral100" color="neutral600">
        <Icon size={24} strokeWidth={strokeWidth} />
      </StyledCircle>
    </Link.External>
  );
}

export default IconLink;
