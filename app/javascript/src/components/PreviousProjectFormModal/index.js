import React from "react";
import { Dialog } from "reakit/Dialog";
import { StyledDialog, StyledDialogScrollable } from "./styles";
export * from "./usePreviousProjectModal";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import PreviousProjectFormContainer from "./PreviousProjectFormContainer";

export default function PreviousProjectFormModal({
  unstable_finalFocusRef,
  ...props
}) {
  const scrollRef = React.useRef();

  React.useEffect(() => {
    const scrollBox = scrollRef.current;
    if (props.modal.visible) {
      disableBodyScroll(scrollBox);
    }
    return () => enableBodyScroll(scrollBox);
  }, [props.modal.visible]);

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
