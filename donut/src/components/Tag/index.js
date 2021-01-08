import React from "react";
import {
  StyledTag,
  StyledTagText,
  StyledTagPrefix,
  StyledTagSuffix,
} from "./styles";

function Tag({ children, icon: Icon, suffix, ...props }) {
  return (
    <StyledTag {...props}>
      {Icon ? (
        <StyledTagPrefix>
          <Icon />
        </StyledTagPrefix>
      ) : null}
      <StyledTagText>{children}</StyledTagText>
      {suffix ? <StyledTagSuffix>{suffix}</StyledTagSuffix> : null}
    </StyledTag>
  );
}

Tag.defaultProps = {
  size: "s",
  variant: "neutral",
};

export default Tag;
