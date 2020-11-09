import React from "react";
import { Dialog } from "reakit/Dialog";
import {
  StyledDialog,
  StyledDialogScrollable,
} from "@advisable-main/components/PreviousProjectFormModal/styles";
export * from "./useComposerModal";
import PostContainer from "./PostContainer";

export default function ComposerModal({ unstable_finalFocusRef, ...props }) {
  return (
    <Dialog
      {...props.modal}
      as={StyledDialog}
      preventBodyScroll={false}
      hideOnClickOutside={false}
      aria-label="Create Post Modal"
      unstable_finalFocusRef={unstable_finalFocusRef}
    >
      {props.modal.visible && (
        <StyledDialogScrollable>
          <PostContainer {...props} />
        </StyledDialogScrollable>
      )}
    </Dialog>
  );
}
