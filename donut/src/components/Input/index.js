import React from "react";
import { StyledInput } from "./styles";

// A basic input component. Other form control components build upon this
// component.
const Input = React.forwardRef((props, ref) => {
  return <StyledInput ref={ref} {...props} />;
});

export default Input;
