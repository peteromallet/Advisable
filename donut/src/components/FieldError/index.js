import React from "react";
import { FieldError as FieldErrorStyles } from "./styles";

const FieldError = ({ children }) => {
  return (
    <FieldErrorStyles fontSize="xs" color="red600">
      {children}
    </FieldErrorStyles>
  );
};

export default FieldError;
