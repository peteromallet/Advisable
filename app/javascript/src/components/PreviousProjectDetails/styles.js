import styled from "styled-components";
import { layout, space, variant, padding } from "styled-system";
import { theme, Text } from "@advisable/donut";

export const StyledImageThumbnail = styled.div`
  ${layout};
  ${space}

  cursor: pointer;
  border-radius: 12px;
  background-size: cover;
  background-position: center;
  background-color: ${theme.colors.neutral100};

  &:hover {
    filter: brightness(90%);
  }
`;

export const StyledBadgePrefix = styled.div`
  margin-right: 8px;

  svg {
    width: 24px;
    height: 24px;
    stroke-width: 2;
  }
`;

export const StyledTitle = styled(Text)``;
export const StyledMessage = styled(Text)``;

export const VARIANTS = variant({
  variants: {
    neutral: {
      backgroundColor: theme.colors.neutral100,
      svg: { color: theme.colors.neutral500 },
      [StyledTitle]: { color: theme.colors.neutral800 },
      [StyledMessage]: { color: theme.colors.neutral600 },
    },
    red: {
      backgroundColor: theme.colors.red100,
      svg: { color: theme.colors.red400 },
      [StyledTitle]: { color: theme.colors.red500 },
      [StyledMessage]: { color: theme.colors.red500 },
    },
  },
});

export const StyledBadge = styled.div`
  ${padding}
  ${VARIANTS}

  font-weight: 400;
  border-radius: 12px;
  width: 100%;
  align-items: center;
`;
