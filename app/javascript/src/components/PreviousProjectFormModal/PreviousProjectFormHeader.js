import React from "react";
import { Text } from "@advisable/donut";
import {
  StyledPreviousProjectFormHeader,
  StyledClosePreviousProjectFormButton,
} from "./styles";

export default function PreviousProjectFormHeader({ modal }) {
  return (
    <StyledPreviousProjectFormHeader>
      <Text fontSize="l" color="blue900">
        Previous project
      </Text>
      <StyledClosePreviousProjectFormButton onClick={modal.hide}>
        Save and close
      </StyledClosePreviousProjectFormButton>
    </StyledPreviousProjectFormHeader>
  );
}
