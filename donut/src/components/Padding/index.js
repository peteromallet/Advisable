// DEPRECATED: You should use the Box component with padding props instead.
import React from "react";
import { Padding as PaddingStyles } from "./styles";

const Padding = ({ children, ...rest }) => {
  return <PaddingStyles {...rest}>{children}</PaddingStyles>;
};

export default Padding;
