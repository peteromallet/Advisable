import React from "react";
import { ModalHeader } from "./styles";

export default ({ children }) => {
  return (
    <ModalHeader>
      <div>{children}</div>
    </ModalHeader>
  );
};
