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
    xl: {
      width: "1136px",
      height: "416px",
      padding: "28px",
      outline: "1px solid red",
    },
    l: {
      width: "1024px",
      height: "368px",
      padding: "20px",
      outline: "1px solid green",
    },
    m: {
      width: "100vw",
      height: "33.3vw",
      padding: "20px",
      outline: "1px solid blue",
    },
    s: {
      width: "100vw",
      height: "33.3vw",
      padding: "20px",
      outline: "1px solid black",
    },
    xs: {
      width: "100vw",
      height: "33.3vw",
      padding: "16px",
      outline: "1px solid purple",
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
