import React from "react";
import { Text, Icon } from "@advisable/donut";
import {
  StyledPreviousProjectFormHeader,
  StyledClosePreviousProjectFormButton,
} from "./styles";

export default function PreviousProjectFormHeader({ modal, data }) {
  return (
    <StyledPreviousProjectFormHeader>
      <Text fontSize="m" color="blue900">
        {data ? data.previousProject.title : "Add a previous project"}
      </Text>
      <StyledClosePreviousProjectFormButton onClick={modal.hide}>
        Save and close
        <Icon icon="chevron-down" ml="xxs" />
      </StyledClosePreviousProjectFormButton>
    </StyledPreviousProjectFormHeader>
  );
}
