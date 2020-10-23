import styled, { keyframes } from "styled-components";
import { color, variant } from "styled-system";

const size = variant({
  prop: "size",
  variants: {
    xxs: {
      width: 8,
      height: 8,
    },
    xs: {
      width: 12,
      height: 12,
    },
    sm: {
      width: 16,
      height: 16,
    },
    md: {
      width: 24,
      height: 24,
    },
    lg: {
      width: 32,
      height: 32,
    },
    xl: {
      width: 40,
      height: 40,
    },
    xxl: {
      width: 48,
      height: 48,
    },
  },
});

const spin = keyframes`
  from { transform: rotate(0) }
  to { transform: rotate(359deg) }
`;

export const StyledLoader = styled.div`
  ${size};
  ${color};

  svg {
    width: 100%;
    height: 100%;
    animation: ${spin} 700ms linear infinite;
  }
`;
