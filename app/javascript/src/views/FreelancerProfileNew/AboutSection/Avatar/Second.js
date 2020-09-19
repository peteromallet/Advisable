import React from "react";
import { theme, Box, StyledCard } from "@advisable/donut";
import { rgba } from "polished";
import styled from "styled-components";

const StyledAvatarCard = styled(StyledCard)`
  z-index: 4;
  transition: box-shadow 300ms;
  cursor: pointer;
  box-shadow: 0px 8px 12px -4px ${rgba(theme.colors.neutral900, 0.04)},
    0px 4px 20px -4px ${rgba(theme.colors.neutral900, 0.22)};

  &:hover {
    box-shadow: 0px 12px 24px -12px ${rgba(theme.colors.neutral900, 0.08)},
      0px 24px 40px -24px ${rgba(theme.colors.neutral900, 0.3)};
  }
`;

function Avatar({ avatar }) {
  return (
    <StyledAvatarCard
      width={190}
      height={234}
      elevation="m"
      mt="-66px"
      ml="32px"
      mr="30px"
      borderRadius={16}
    >
      <Box
        as="img"
        src={avatar}
        width="190px"
        height="234px"
        borderRadius={16}
        css="object-fit: cover;"
      />
    </StyledAvatarCard>
  );
}

export default Avatar;
