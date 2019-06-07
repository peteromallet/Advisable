import React from "react";
import { FieldError as FieldErrorStyles } from "./styles";

const FieldError = ({ children }) => {
  return (
    <FieldErrorStyles size="xs" color="red.N6">
      {children}
    </FieldErrorStyles>
  );
};

export default FieldError;
