import React from "react";
import { useHistory } from "react-router-dom";
import { Pencil } from "@styled-icons/heroicons-outline";
import { Box, Tooltip } from "@advisable/donut";
import PostAction from "./PostAction";

function EditPost({ post }) {
  const history = useHistory();

  function handleClick() {
    history.push(`/composer/${post.id}/post`);
  }
  return (
    <Tooltip placement="top" content="Edit">
      <Box
        css={`
          outline: none;
        `}
      >
        <PostAction
          bg="neutral100"
          color="neutral600"
          icon={<Pencil />}
          onClick={handleClick}
        />
      </Box>
    </Tooltip>
  );
}

export default EditPost;
