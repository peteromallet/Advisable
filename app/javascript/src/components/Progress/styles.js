import styled from "styled-components";
import { theme } from "@advisable/donut";
import { margin, variant } from "styled-system";

export const StyledProgressBar = styled.div`
  height: 100%;
`;

const sizeVariant = variant({
  prop: "size",
  variants: {
    md: {
      height: 12,
      borderRadius: 6,
      [StyledProgressBar]: {
        borderRadius: 6,
      },
    },
  },
});

const color = variant({
  prop: "color",
  variants: {
    blue: {
      background: theme.colors.blue100,
      [StyledProgressBar]: {
        background: theme.colors.blue500,
      },
    },
  },
});

export const StyledProgress = styled.div`
  ${color}
  ${margin}
  ${sizeVariant}
`;
