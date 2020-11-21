import React from "react";
import { StyledTag } from "./styles";

function Tag({ children, icon: Icon, ...props }) {
  return (
    <StyledTag {...props}>
      {Icon ? <Icon /> : null}
      {children}
    </StyledTag>
  );
}

Tag.defaultProps = {
  size: "s",
  variant: "neutral",
};

export default Tag;
