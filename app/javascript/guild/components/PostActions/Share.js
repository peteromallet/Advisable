import React from "react";
import { DialogDisclosure, useDialogState } from "reakit/Dialog";
import { Link } from "@styled-icons/heroicons-outline";
import { Box, Tooltip } from "@advisable/donut";
import PostAction from "./PostAction";
import ShareModal from "@guild/components/Post/components/ShareModal";

function MessagePostAction({ post }) {
  const modal = useDialogState();
  const url = `https://app.advisable.com/guild/posts/${post.id}`;

  return (
    <>
      <ShareModal externalUrl={url} modal={modal} />
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
