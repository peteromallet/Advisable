import React from "react";
import { Link, theme } from "@advisable/donut";
import styled from "styled-components";

const StyledSocialIcon = styled.div`
  color: ${theme.colors.neutral400};

  &:hover {
    color: ${theme.colors.neutral600};
  }
`;

export default function SocialIcon({ icon: Icon, href }) {
  return (
    <Link.External href={href} target="_blank" mr={1.5}>
      <StyledSocialIcon>
        <Icon size={28} />
      </StyledSocialIcon>
    </Link.External>
  );
}
