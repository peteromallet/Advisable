import React from "react";
import styled from "styled-components";
import { variant } from "styled-system";
import { StyledButton } from "./FileUploadInput";

const type = variant({
  prop: "$type",
  variants: {
    avatar: {
      clipPath: "url(#passportSquircle)",
    },
    cover: {
      clipPath: "url(#coverSquircle)",
    },
  },
});

const StyledActionArea = styled.div`
  ${type}
  position: absolute;
  cursor: ${(props) => (props.onClick ? "pointer" : "auto")};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &:hover + ${StyledButton} {
    opacity: 1;
  }
`;

export default function PictureActionArea({ type, ...props }) {
  return <StyledActionArea $type={type} {...props} />;
}
