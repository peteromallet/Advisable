import React from "react";
import { Text, Icon } from "@advisable/donut";
import {
  StyledPreviousProjectFormHeader,
  StyledClosePreviousProjectFormButton,
} from "./styles";

export default function PreviousProjectFormHeader({ modal, data, children }) {
  return (
    <StyledPreviousProjectFormHeader>
      {children}
      <StyledClosePreviousProjectFormButton onClick={modal.hide}>
        Save and close
        <Icon icon="chevron-down" ml="xxs" />
      </StyledClosePreviousProjectFormButton>
    </StyledPreviousProjectFormHeader>
  );
}
