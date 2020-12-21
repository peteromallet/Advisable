import React from "react";
import { Close } from "@styled-icons/ionicons-outline";
import {
  StyledTag,
  StyledTagText,
  StyledTagPrefix,
  StyledTagSuffix,
  StyledTagRemoveButton,
} from "./styles";

function Tag({ children, onRemove, icon: Icon, suffix, ...props }) {
  return (
    <StyledTag {...props}>
      {Icon ? (
        <StyledTagPrefix>
          <Icon />
        </StyledTagPrefix>
      ) : null}
      <StyledTagText>{children}</StyledTagText>
      {suffix ? <StyledTagSuffix>{suffix}</StyledTagSuffix> : null}
      {onRemove ? (
        <StyledTagRemoveButton onClick={onRemove}>
          <Close />
        </StyledTagRemoveButton>
      ) : null}
    </StyledTag>
  );
}

Tag.defaultProps = {
  size: "s",
  variant: "neutral",
};

export default Tag;
