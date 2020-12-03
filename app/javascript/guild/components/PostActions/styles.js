import styled from "styled-components";
import { darken } from "polished";
import { Box, theme, StyledCircle } from "@advisable/donut";

export const StyledConnectionType = styled(Box)`
  cursor: pointer;
  user-select: none;
  padding: 40px 16px;
  border-radius: 12px;
  background: ${theme.colors.neutral100};
  transition: background-color 100ms, transform 100ms;

  ${StyledCircle} {
    transition: transform 100ms;
  }

  &:hover {
    background: ${darken(0.02, theme.colors.neutral100)};

    ${StyledCircle} {
      transform: scale(1.05);
    }
  }
`;
