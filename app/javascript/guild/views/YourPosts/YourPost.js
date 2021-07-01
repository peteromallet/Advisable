import React from "react";
import { useHistory } from "react-router-dom";
import { useDialogState } from "reakit/Dialog";
import { Box } from "@advisable/donut";
import { StyledYourPost, StyledStatus } from "./styles";
import Post from "@guild/components/Post";
import CannotChangeModal from "@guild/components/PostActions/CannotChangeModal";

export default function YourPost({ post }) {
  const history = useHistory();
  const modal = useDialogState();
  const published = /published|removed/.test(post.status);

  function handleClick() {
    post.article ? modal.show() : history.push(`composer/${post.id}/type`);
  }

  return (
    <>
      <CannotChangeModal modal={modal} />
      <Box position="relative">
        <StyledStatus onClick={handleClick}>
          {published ? "Edit" : "Edit Draft"}
        </StyledStatus>
        <StyledYourPost draft={!published}>
          <Post post={post} />
        </StyledYourPost>
      </Box>
    </>
  );
}
