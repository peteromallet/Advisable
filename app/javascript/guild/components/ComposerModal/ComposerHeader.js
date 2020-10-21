import React from "react";
import { X } from "@styled-icons/feather";
import { Box } from "@advisable/donut";
import {
  StyledPreviousProjectFormHeader as FormHeader,
  StyledClosePreviousProjectFormButton as CloseButton,
} from "@advisable-main/components/PreviousProjectFormModal/styles";

export default function ComposerHeader({ modal, children }) {
  return (
    <FormHeader>
      {children}
      <CloseButton onClick={modal.hide}>
        Close
        <Box ml="xxs">
          <X size={24} strokeWidth={2} />
        </Box>
      </CloseButton>
    </FormHeader>
  );
}
