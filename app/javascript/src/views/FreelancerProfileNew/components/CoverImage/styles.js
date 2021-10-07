import styled from "styled-components";
import { theme } from "@advisable/donut";
import { space, variant } from "styled-system";

export const StyledCoverImage = styled.img`
  border-radius: 12px;
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.isLoading ? 0 : 1)};
  clip-path: url(#coverSquircle);
  transition: opacity 400ms;
`;

export const StyledContentWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  clip-path: url(#coverSquircle);
  background-color: ${theme.colors.blue50};
`;

const size = variant({
  prop: "size",
  variants: {
    collapse: {
      position: "absolute !important",
      pointerEvents: "none",
      top: "0",
      width: "304px",
      height: "114px",
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
