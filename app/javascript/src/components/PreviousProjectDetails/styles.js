import styled from "styled-components";
import { layout, space, variant, padding } from "styled-system";
import { theme, Text, StyledCircle } from "@advisable/donut";

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

export const StyledTitle = styled(Text)``;
export const StyledMessage = styled(Text)``;

export const VARIANTS = variant({
  variants: {
    neutral: {
      backgroundColor: "neutral100",
      svg: { color: "neutral600" },
      [StyledCircle]: { bg: "neutral200" },
      [StyledTitle]: { color: "neutral800" },
      [StyledMessage]: { color: "neutral600" },
    },
    red: {
      backgroundColor: "red100",
      svg: { color: "red600" },
      [StyledCircle]: { bg: "red200" },
      [StyledTitle]: { color: "red700" },
      [StyledMessage]: { color: "red700" },
    },
  },
});

export const StyledBadge = styled.div`
  ${padding}
  ${VARIANTS}

  svg {
    width: 20px;
    height: 20px;
  }

  font-weight: 400;
  border-radius: 12px;
  width: 100%;
  align-items: center;
`;
