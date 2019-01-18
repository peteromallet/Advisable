import React from "react";
import Scrollable from "src/components/Scrollable";
import { ModalBody } from "./styles";

// The modal body provides as component that will scroll when filled with
// that is greater than the screen height.
export default ({ children }) => {
  return (
    <ModalBody>
      <Scrollable padding="xl">
        {children}
      </Scrollable>
    </ModalBody>
  );
};