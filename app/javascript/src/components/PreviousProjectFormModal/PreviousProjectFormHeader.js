import React from "react";
import { Icon, useBreakpoint } from "@advisable/donut";
import {
  StyledPreviousProjectFormHeader,
  StyledClosePreviousProjectFormButton,
} from "./styles";

export default function PreviousProjectFormHeader({ modal, data, children }) {
  const mUp = useBreakpoint("mUp");

  return (
    <StyledPreviousProjectFormHeader>
      {children}
      <StyledClosePreviousProjectFormButton onClick={modal.hide}>
        {mUp ? "Save and close" : "Close"}
        <Icon icon={mUp ? "chevron-down" : "x"} ml="xxs" />
      </StyledClosePreviousProjectFormButton>
    </StyledPreviousProjectFormHeader>
  );
}
