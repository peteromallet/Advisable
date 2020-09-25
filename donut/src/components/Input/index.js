import React, { useState } from "react";
import {
  StyledInput,
  StyledInputControl,
  StyledInputDecoration,
} from "./styles";

// A basic input component. Other form control components build upon this
// component.
const Input = React.forwardRef(function Input(
  {
    size,
    prefix,
    suffix,
    error,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginX,
    marginY,
    ...props
  },
  ref,
) {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
    props.onFocus(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    props.onBlur(e);
  };

  return (
    <StyledInput
      $focused={focused}
      $error={error}
      $disabled={props.disabled}
      size={size}
      margin={margin}
      marginX={marginX}
      marginY={marginY}
      marginTop={marginTop}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
    >
      {prefix && <StyledInputDecoration>{prefix}</StyledInputDecoration>}
      <StyledInputControl
        {...props}
        ref={ref}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      {suffix && <StyledInputDecoration>{suffix}</StyledInputDecoration>}
    </StyledInput>
  );
});

Input.defaultProps = {
  onBlur: () => {},
  onFocus: () => {},
  size: "md",
};

export default Input;
