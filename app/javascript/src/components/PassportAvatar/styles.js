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
      borderRadius: "12px",
    },
    md: {
      width: "56px",
      height: "64px",
      borderRadius: "16px",
    },
    lg: {
      width: "84px",
      height: "96px",
      borderRadius: "20px",
    },
    xl: {
      width: "126px",
      height: "144px",
      borderRadius: "20px",
      ["svg"]: {
        zIndex: 6,
        width: "138px",
        height: "158px",
        top: "-2px",
        left: "-2px",
        strokeWidth: "2px",
      },
    },
    "2xl": {
      width: "168px",
      height: "192px",
      borderRadius: "20px",
      border: "1px solid green",
      ["svg"]: {
        zIndex: 6,
        width: "174px",
        height: "196px",
        strokeWidth: "4px",
      },
    },
  },
});

export const StyledPassportAvatar = styled.div`
  ${space}
  ${size}

  flex-shrink: 0;
  overflow: hidden;
  position: relative;

  .svgClip {
    opacity: 1;
    position: absolute;
  }
`;
