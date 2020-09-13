import React from "react";
import Scrollable from "src/components/Scrollable";
import { ModalBody as StyledModalBody } from "./styles";

// The modal body provides as component that will scroll when filled with
// that is greater than the screen height.
export default function ModalBody({ children }) {
  return (
    <StyledModalBody>
      <Scrollable padding="xl">{children}</Scrollable>
    </StyledModalBody>
  );
}
