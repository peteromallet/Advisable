import styled from "styled-components";
import { space, variant } from "styled-system";

const colors = variant({
  prop: "color",
  variants: {
    blue: {
      bg: "blue100",
      color: "blue300",
    },
  },
});

export const StyledCoverInner = styled.div`
  ${colors}
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  display: flex;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 1px;
  align-items: center;
  justify-content: center;
  clip-path: url(#coverSquircle);
  background-size: cover;
  background-position: center;
`;

const size = variant({
  prop: "size",
  variants: {
    collapse: {
      width: "100%",
      height: "120px",
      px: "0px",
      left: "-12px",
    },
    xl: {
      width: "1136px",
      height: "360px",
      px: "28px",
    },
    l: {
      width: "1024px",
      height: "328px",
      px: "20px",
    },
    m: {
      width: "100vw",
      height: "27.3vw",
      px: "20px",
    },
    s: {
      width: "100vw",
      height: "27.3vw",
      px: "20px",
    },
    xs: {
      width: "100vw",
      height: "27.3vw",
      px: "12px",
    },
  },
});

export const StyledCover = styled.div`
  ${space}
  ${size}

  flex-shrink: 0;
  position: relative;

  .svgClip {
    opacity: 0;
    position: absolute;
  }
`;
