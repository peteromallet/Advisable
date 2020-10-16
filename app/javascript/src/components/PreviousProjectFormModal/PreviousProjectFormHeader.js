import { X } from "@styled-icons/feather";
import { Box } from "@advisable/donut";
import {
  StyledPreviousProjectFormHeader,
  StyledClosePreviousProjectFormButton,
} from "./styles";

export default function PreviousProjectFormHeader({ modal, children }) {
  return (
    <StyledPreviousProjectFormHeader>
      {children}
      <StyledClosePreviousProjectFormButton onClick={modal.hide}>
        Close
        <Box ml="xxs">
          <X size={24} strokeWidth={2} />
        </Box>
      </StyledClosePreviousProjectFormButton>
    </StyledPreviousProjectFormHeader>
  );
}
