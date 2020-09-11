import React from "react";
import { rgba } from "polished";
import styled from "styled-components";
import { theme } from "@advisable/donut";
import { Portal } from "reakit/Portal";
import { useDialogState, Dialog, DialogBackdrop } from "reakit/Dialog";

const StyledBackdrop = styled(DialogBackdrop)`
  top: 0;
  right: 0;
  width: 100%;
  z-index: 999;
  height: 100vh;
  position: fixed;
  max-width: 620px;
  background: rgba(255, 255, 255, 0.8);
`;

const StyledDialog = styled(Dialog)`
  top: 50%;
  right: 0;
  width: 100%;
  outline: none;
  z-index: 9999;
  position: fixed;
  max-width: 620px;
  transform: translateY(-50%);
`;

const StyledWindow = styled.div`
  outline: none;
  margin: 0 auto;
  max-width: 400px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 40px ${rgba(theme.colors.neutral800, 0.2)},
    0 2px 4px ${rgba(theme.colors.neutral800, 0.1)};
`;

const DrawerModal = ({ dialog, children, ...props }) => {
  const state = dialog || useDialogState();

  return (
    <>
      <Portal>
        <StyledBackdrop {...state} />
      </Portal>
      <StyledDialog {...state} {...props}>
        <StyledWindow tabIndex={-1}>{children}</StyledWindow>
      </StyledDialog>
    </>
  );
};

export default DrawerModal;
