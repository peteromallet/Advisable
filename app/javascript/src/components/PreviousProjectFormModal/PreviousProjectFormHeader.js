import React from "react";
import { StyledPreviousProjectFormHeader } from "./styles";

export default function PreviousProjectFormHeader({ modal }) {
  return (
    <StyledPreviousProjectFormHeader>
      Add a previous project
      <button onClick={modal.hide}>close</button>
    </StyledPreviousProjectFormHeader>
  );
}
