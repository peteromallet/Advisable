import React from "react";
import { DialogDisclosure, useDialogState } from "reakit/Dialog";
import { Modal, Box, Button, Text } from "@advisable/donut";
import CopyURL from "@advisable-main/components/CopyURL";

const ShareEventModal = ({ url }) => {
  return (
    <>
      <Text
        as="h5"
        mb="l"
        color="blue900"
        fontSize="3xl"
        lineHeight="l"
        fontWeight="medium"
        letterSpacing="-0.02em"
        textAlign="center"
      >
        Do you know another freelancer that you’d want to share this Event with?
      </Text>
      <CopyURL>{url}</CopyURL>
    </>
  );
};

export default function Share({ event, ...buttonProps }) {
  const modal = useDialogState();
  const url = `https://app.advisable.com/guild/events/${event.id}`;

  return (
    <>
      <Modal modal={modal} label="Share event">
        <ShareEventModal url={url} />
      </Modal>
      <Box
        css={`
          outline: none;
        `}
      >
        <DialogDisclosure {...modal}>
          {(props) => (
            <Button {...props} {...buttonProps}>
              Share
            </Button>
          )}
        </DialogDisclosure>
      </Box>
    </>
  );
}
