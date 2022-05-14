import React, { useState, useEffect, useCallback } from "react";
import { ChevronBack } from "@styled-icons/ionicons-outline/ChevronBack";
import { ChevronForward } from "@styled-icons/ionicons-outline/ChevronForward";
import { useDialogState, Dialog } from "reakit/Dialog";
import { rgba } from "polished";
import styled from "styled-components";
import { Close } from "@styled-icons/ionicons-outline/Close";
import { theme, Box, Button, Text } from "@advisable/donut";

export function useImageGallery(opts) {
  const [index, setIndex] = useState(0);
  const dialog = useDialogState(opts);

  const handleNext = () => {
    setIndex(index + 1);
  };

  const handlePrevious = () => {
    setIndex(index - 1);
  };

  const handleOpen = (i) => {
    setIndex(i);
    dialog.show();
  };

  return {
    ...dialog,
    next: handleNext,
    back: handlePrevious,
    open: handleOpen,
    index,
  };
}

const StyledViewableImageDialog = styled(Dialog).withConfig({
  shouldForwardProp: (prop) =>
    !["open", "next", "back", "index"].includes(prop),
})`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 30;
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  background: ${rgba(theme.colors.neutral50, 0.9)};
`;

const StyledGalleryNavigation = styled(Box)`
  top: 50%;
  width: 52px;
  height: 52px;
  position: absolute;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-26px);
  left: ${(p) => p.left};
  right: ${(p) => p.right};
  background: white;
  cursor: pointer;
  border: 1px solid ${theme.colors.neutral300};

  &:hover {
    background-color: ${theme.colors.neutral100};
  }

  svg {
    width: 24px;
  }
`;

const StyledGalleryImage = styled.img`
  width: 90%;
  height: 80%;
  user-select: none;
  object-fit: contain;
`;

const ARROW_RIGHT = 39;
const ARROW_LEFT = 37;

export default function Viewableimage({ dialog, images }) {
  const currentImage = images[dialog.index];

  const hasPrevious = dialog.index > 0;
  const hasNext = dialog.index !== images.length - 1;

  const handleKeyPress = useCallback(
    (e) => {
      if (e.keyCode === ARROW_RIGHT && hasNext) {
        dialog.next();
      }

      if (e.keyCode === ARROW_LEFT && hasPrevious) {
        dialog.back();
      }
    },
    [dialog, hasNext, hasPrevious],
  );

  useEffect(() => {
    if (dialog.visible) {
      document.addEventListener("keydown", handleKeyPress);
      return () => document.removeEventListener("keydown", handleKeyPress);
    }
  }, [dialog.visible, handleKeyPress]);

  return (
    <StyledViewableImageDialog {...dialog} aria-label="Images">
      <Box position="absolute" zIndex={2} right="16px" top="16px">
        <Button
          prefix={<Close />}
          type="button"
          variant="dark"
          size="s"
          onClick={dialog.hide}
        >
          Close
        </Button>
      </Box>
      <Box position="absolute" zIndex={1} top="24px" width="100%">
        <Text fontSize="l" textAlign="center" color="neutral700">
          {dialog.index + 1} / {images.length}
        </Text>
      </Box>
      {hasPrevious ? (
        <StyledGalleryNavigation onClick={dialog.back} left="24px">
          <ChevronBack />
        </StyledGalleryNavigation>
      ) : null}
      {hasNext ? (
        <StyledGalleryNavigation onClick={dialog.next} right="24px">
          <ChevronForward />
        </StyledGalleryNavigation>
      ) : null}
      <StyledGalleryImage src={currentImage.url} />
    </StyledViewableImageDialog>
  );
}
