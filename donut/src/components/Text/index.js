import React from "react";
import { Text as TextStyles } from "./styles";

const Text = ({ children, ...rest }) => {
  return <TextStyles {...rest}>{children}</TextStyles>;
};

export default Text;
