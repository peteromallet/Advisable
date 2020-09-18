import React from "react";
import { StyledTag } from "./styles";

function GuildTag({ children, ...props }) {
  return <StyledTag {...props}>{children}</StyledTag>;
}

GuildTag.defaultProps = {
  size: "s",
  variant: "light",
};

export default GuildTag;
