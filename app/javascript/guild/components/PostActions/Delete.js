import React from "react";
import { useHistory } from "react-router-dom";
import { Trash } from "@styled-icons/heroicons-outline";
import { useNotifications } from "src/components/Notifications";
import { Box, Tooltip } from "@advisable/donut";
import { useMutation } from "@apollo/client";
import { DELETE_GUILD_POST } from "./mutations";
import PostAction from "./PostAction";

function DeletePost({ post, size }) {
  const history = useHistory();
  const notifications = useNotifications();
  const [deleteGuildPost] = useMutation(DELETE_GUILD_POST);

  const handleDelete = async () => {
    await deleteGuildPost({
      variables: {
        input: {
          guildPostId: post.id,
        },
      },
    });
    notifications.notify(`Deleted Guild Post: ${post.title}`);
    history.push(`/feed`);
  };

  return (
    <Tooltip placement="top" content="Delete">
      <Box
        css={`
          outline: none;
        `}
      >
        <PostAction
          size={size}
          bg="neutral100"
          color="neutral600"
          icon={<Trash />}
          onClick={handleDelete}
        />
      </Box>
    </Tooltip>
  );
}

export default DeletePost;
