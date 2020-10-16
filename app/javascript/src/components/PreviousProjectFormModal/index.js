import { Dialog } from "reakit/Dialog";
import { StyledDialog, StyledDialogScrollable } from "./styles";
export * from "./usePreviousProjectModal";
import PreviousProjectFormContainer from "./PreviousProjectFormContainer";

export default function PreviousProjectFormModal({
  unstable_finalFocusRef,
  ...props
}) {
  return (
    <Dialog
      {...props.modal}
      as={StyledDialog}
      preventBodyScroll={false}
      hideOnClickOutside={false}
      unstable_finalFocusRef={unstable_finalFocusRef}
      aria-label="Previous Project Modal"
    >
      {props.modal.visible && (
        <StyledDialogScrollable>
          <PreviousProjectFormContainer {...props} />
        </StyledDialogScrollable>
      )}
    </Dialog>
  );
}
