import React from "react";
import { Text as TextStyles } from "./styles";

const Text = ({ children, size, weight, ...rest }) => {
  return (
    <TextStyles fontSize={size} fontWeight={weight} {...rest}>
      {children}
    </TextStyles>
  );
};

Text.Styles = TextStyles;

export default Text;
