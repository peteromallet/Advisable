import React from "react";
import { Dialog } from "reakit/Dialog";
import { useBreakpoint } from "@advisable/donut";
import {
  StyledDialog,
  StyledDialogScrollable,
} from "@advisable-main/components/PreviousProjectFormModal/styles";
export * from "./useComposerModal";
import PostContainer from "./PostContainer";

export default function ComposerModal({ unstable_finalFocusRef, ...props }) {
  const isDesktop = useBreakpoint("mUp");

  return (
    <Dialog
      {...props.modal}
      as={StyledDialog}
      hideOnClickOutside={false}
      preventBodyScroll={isDesktop}
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
