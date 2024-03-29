import React from "react";
import Text from "../Text";

function InputError({ children, ...props }) {
  return (
    <Text
      color="red700"
      letterSpacing="-0.01em"
      lineHeight="s"
      fontSize="14px"
      {...props}
    >
      {children}
    </Text>
  );
}

export default InputError;
