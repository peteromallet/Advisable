import React from "react";
import { Spacing as SpacingStyles } from "./styles";

const Spacing = ({ children, ...rest }) => {
  return <SpacingStyles {...rest}>{children}</SpacingStyles>;
};

export default Spacing;
