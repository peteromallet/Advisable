import React from "react";
import { DialogDisclosure, useDialogState } from "reakit/Dialog";
import { Link } from "@styled-icons/heroicons-outline/Link";
import { Modal, Box, Tooltip } from "@advisable/donut";
import PostAction from "./PostAction";
import ShareModal from "./ShareModal";

function MessagePostAction({ post, size }) {
  const modal = useDialogState();
  const url = `https://app.advisable.com/posts/${post.id}`;

  return (
    <>
      <Modal modal={modal} label="Share post">
        <ShareModal externalUrl={url} />
      </Modal>
      <Tooltip placement="top" content="Share">
        <Box
          css={`
            outline: none;
          `}
        >
          <DialogDisclosure {...modal}>
            {(props) => (
              <PostAction
                {...props}
                size={size}
                color="neutral600"
                bg="neutral100"
                icon={<Link />}
              />
            )}
          </DialogDisclosure>
        </Box>
      </Tooltip>
    </>
  );
}

export default MessagePostAction;
