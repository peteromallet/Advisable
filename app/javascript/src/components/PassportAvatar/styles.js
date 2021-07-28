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

export const StyledPassportAvatarInner = styled.div`
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
  clip-path: url(#passportSquircle);
  background-size: cover;
  background-position: center;
`;

const size = variant({
  prop: "size",
  variants: {
    xs: {
      width: "35px",
      height: "40px",
      borderRadius: "2px",
    },
    sm: {
      width: "42px",
      height: "48px",
      borderRadius: "2px",
    },
    md: {
      width: "56px",
      height: "64px",
      borderRadius: "2px",
    },
    lg: {
      width: "84px",
      height: "96px",
      borderRadius: "2px",
    },
    xl: {
      width: "126px",
      height: "144px",
      borderRadius: "20px",
    },
    "2xl": {
      width: "168px",
      height: "192px",
      borderRadius: "20px",
    },
  },
});

export const StyledPassportAvatar = styled.div`
  ${space}
  ${size}

  flex-shrink: 0;
  position: relative;

  .svgClip {
    opacity: 0;
    position: absolute;
  }
`;
