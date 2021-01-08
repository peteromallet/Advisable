import React from "react";
import { StyledTag, StyledTagText } from "./styles";

function Tag({ children, icon: Icon, suffix, ...props }) {
  return (
    <StyledTag {...props}>
      {Icon ? <Icon /> : null}
      <StyledTagText>{children}</StyledTagText>
      {suffix ? suffix : null}
    </StyledTag>
  );
}

Tag.defaultProps = {
  size: "s",
  variant: "neutral",
};

export default Tag;
