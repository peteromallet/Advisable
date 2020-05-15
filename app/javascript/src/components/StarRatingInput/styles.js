import styled, { css } from "styled-components";
import { theme } from "@advisable/donut";

export const StyledStarRatingInput = styled.div`
  display: flex;
`;

const StyledStarRating_Filled = css`
  color: ${theme.colors.yellow500};
`;

export const StyledStarRating = styled.div`
  color: ${theme.colors.neutral200};
  transition: transform 200ms;

  &:hover {
    cursor: pointer;
    transform: scale(1.15);
    color: ${theme.colors.yellow500};
  }

  ${(p) => p.filled && StyledStarRating_Filled}
`;
