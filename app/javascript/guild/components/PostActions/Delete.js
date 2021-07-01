import React from "react";
import { useHistory } from "react-router-dom";
import { Trash } from "@styled-icons/heroicons-outline/Trash";
import { useNotifications } from "src/components/Notifications";
import { Modal, Box, Tooltip, Button, Text, Paragraph } from "@advisable/donut";
import { useMutation } from "@apollo/client";
import { DELETE_GUILD_POST } from "./mutations";
import PostAction from "./PostAction";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import CannotEditModal from "./CannotEditModal";

function DeletePost({ post, size }) {
  const history = useHistory();
  const notifications = useNotifications();
  const modal = useDialogState();

  const [deleteGuildPost, { loading }] = useMutation(DELETE_GUILD_POST);

  const handleDelete = async () => {
    await deleteGuildPost({
      variables: {
        input: {
          guildPostId: post.id,
        },
      },
    });
    notifications.notify("Deleted guild post");
    history.push(`/feed`);
  };

  return (
    <>
      {post.article ? (
        <CannotEditModal action="Delete" modal={modal} />
      ) : (
        <Modal modal={modal} label="Delete post" padding="l">
          <Text
            as="h4"
            mb={2}
            color="blue900"
            fontSize="24px"
            lineHeight="26px"
            fontWeight="medium"
            letterSpacing="-0.02em"
          >
            Delete Post?
          </Text>
          <Paragraph mb={6}>
            Are you sure you want to delete this post. This can not be undone.
          </Paragraph>
          <Button
            mr={2}
            size="s"
            loading={loading}
            disabled={loading}
            prefix={<Trash />}
            onClick={handleDelete}
          >
            Confirm
          </Button>
          <Button
            size="s"
            variant="subtle"
            disabled={loading}
            onClick={modal.hide}
          >
            Cancel
          </Button>
        </Modal>
      )}

      <Tooltip placement="top" content="Delete">
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
                bg="neutral100"
                color="neutral600"
                aria-label="Delete post"
                data-testid="deletePost"
                icon={<Trash />}
              />
            )}
          </DialogDisclosure>
        </Box>
      </Tooltip>
    </>
  );
}

export default DeletePost;
