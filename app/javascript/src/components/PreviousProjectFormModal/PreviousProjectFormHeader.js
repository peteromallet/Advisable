import React from "react";
import { ChevronDown, X } from "@styled-icons/feather";
import { Box, useBreakpoint } from "@advisable/donut";
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
        <Box ml="xxs">
          {mUp ? (
            <ChevronDown size={24} strokeWidth={2} />
          ) : (
            <X size={24} strokeWidth={2} />
          )}
        </Box>
      </StyledClosePreviousProjectFormButton>
    </StyledPreviousProjectFormHeader>
  );
}
