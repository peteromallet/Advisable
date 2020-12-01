import React from "react";
import { Box } from "@advisable/donut";
import Share from "./Share";
import Edit from "./Edit";
import Connect from "./Connect";
import ReactionsButton from "../Post/components/ReactionsButton";
import useViewer from "src/hooks/useViewer";

export default function PostActions({ post, size, showEdit = true, ...props }) {
  const viewer = useViewer();
  const viewerIsAuthor = post.author.id === viewer?.id;

  return (
    <Box display="inline-flex" alignItems="center" {...props}>
      <Box mr="2">
        <ReactionsButton size={size} post={post} />
      </Box>
      {!viewerIsAuthor ? (
        <Box mr="2">
          <Connect post={post} size={size} />
        </Box>
      ) : null}
      {post.shareable ? <Share post={post} size={size} /> : null}
      {showEdit && viewerIsAuthor ? (
        <Box ml={2}>
          <Edit post={post} size={size} />
        </Box>
      ) : null}
    </Box>
  );
}
