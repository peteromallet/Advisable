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

export const StyledCover = styled.div`
  ${space}

  flex-shrink: 0;
  position: relative;
  width: 1080px;
  height: 320px;

  .svgClip {
    opacity: 0;
    position: absolute;
  }
`;
