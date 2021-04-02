import React from "react";
import { FieldError as FieldErrorStyles } from "./styles";

const FieldError = ({ children, ...props }) => {
  return (
    <FieldErrorStyles fontSize="xs" color="red600" {...props}>
      {children}
    </FieldErrorStyles>
  );
};

export default FieldError;
