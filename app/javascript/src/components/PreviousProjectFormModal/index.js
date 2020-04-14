import React from "react";
import { Dialog } from "reakit/Dialog";
import { StyledDialog } from "./styles";
export * from "./usePreviousProjectModal";
import PreviousProjectFormContainer from "./PreviousProjectFormContainer";

export default function PreviousProjectFormModal(props) {
  return (
    <Dialog
      {...props.modal}
      as={StyledDialog}
      hideOnClickOutside={false}
      aria-label="Previous Project Modal"
    >
      {props.modal.visible && <PreviousProjectFormContainer {...props} />}
    </Dialog>
  );
}
