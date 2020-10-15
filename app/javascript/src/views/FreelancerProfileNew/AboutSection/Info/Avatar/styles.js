import { rgba } from "polished";
import styled from "styled-components";
import { Box, theme, StyledCard } from "@advisable/donut";

export const StyledAvatarCard = styled(StyledCard)`
  z-index: 4;
  position: relative;
  transition: box-shadow 300ms;
  background-color: ${theme.colors.neutral200};
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0px 8px 12px -4px ${rgba(theme.colors.neutral900, 0.04)},
    0px 4px 20px -4px ${rgba(theme.colors.neutral900, 0.22)};

  &:hover {
    box-shadow: 0px 12px 24px -12px ${rgba(theme.colors.neutral900, 0.08)},
      0px 24px 40px -24px ${rgba(theme.colors.neutral900, 0.3)};
  }
`;

export const StyledAvatarImage = styled(Box)`
  border-radius: 16px;
  object-fit: cover;
  opacity: ${(props) => (props.loaded ? 1 : 0)};
  transition: opacity 400ms;
`;
