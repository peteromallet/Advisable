import React from "react";
import { StyledTag } from "./styles";

function Tag({ children, ...props }) {
  return <StyledTag {...props}>{children}</StyledTag>;
}

Tag.defaultProps = {
  size: "s",
  variant: "neutral",
};

export default Tag;
