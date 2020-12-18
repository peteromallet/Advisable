import React from "react";
import { StyledTag } from "./styles";

function Tag({ children, icon: Icon, suffix, ...props }) {
  return (
    <StyledTag {...props}>
      {Icon ? <Icon /> : null}
      {children}
      {suffix ? suffix : null}
    </StyledTag>
  );
}

Tag.defaultProps = {
  size: "s",
  variant: "neutral",
};

export default Tag;
