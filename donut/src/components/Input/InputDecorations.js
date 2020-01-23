import React from "react";
import {
  StyledInputDecorations,
  StyledInputDecorator,
  StyledInputDecorationsChildren,
} from "./styles";

const InputDecorations = ({ children, prefix, suffix }) => {
  return (
    <StyledInputDecorations>
      {prefix && <StyledInputDecorator>{prefix}</StyledInputDecorator>}
      <StyledInputDecorationsChildren>
        {children}
      </StyledInputDecorationsChildren>
      {suffix && <StyledInputDecorator>{suffix}</StyledInputDecorator>}
    </StyledInputDecorations>
  );
};

export default InputDecorations;
