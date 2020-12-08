import React from "react";
import { useHistory } from "react-router-dom";
import { Trash } from "@styled-icons/heroicons-outline";
import { useNotifications } from "src/components/Notifications";
import { Modal, Box, Tooltip, Button, Text } from "@advisable/donut";
import { useMutation } from "@apollo/client";
import { DELETE_GUILD_POST } from "./mutations";
import PostAction from "./PostAction";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";

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
    notifications.notify("Deleted Guild Post");
    history.push(`/feed`);
  };

  return (
    <>
      <Modal modal={modal} label="Delete post" padding="l">
        <Text
          as="h4"
          mb="xs"
          pr="40px"
          color="blue900"
          fontSize="24px"
          lineHeight="26px"
          fontWeight="medium"
          letterSpacing="-0.02em"
        >
          Delete this Guild Post?
        </Text>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginBottom="l"
        >
          <Button
            disabled={loading}
            loading={loading}
            onClick={handleDelete}
            prefix={<Trash />}
            mt={4}
            size="s"
          >
            Confirm
          </Button>
        </Box>
      </Modal>

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
