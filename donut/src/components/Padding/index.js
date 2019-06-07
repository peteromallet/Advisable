import React from "react";
import { Padding as PaddingStyles } from "./styles";

const Padding = ({ children, ...rest }) => {
  return <PaddingStyles {...rest}>{children}</PaddingStyles>;
};

export default Padding;
