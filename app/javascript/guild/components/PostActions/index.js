import React from "react";
import { Box } from "@advisable/donut";
import Share from "./Share";
import Edit from "./Edit";
import Connect from "./Connect";
import Delete from "./Delete";
import Resolve from "./Resolve";
import ReactionsButton from "../Post/components/ReactionsButton";
import useViewer from "src/hooks/useViewer";

export default function PostActions({
  post,
  size,
  showShare = true,
  showEdit = true,
  showDelete = true,
  showResolve = true,
  walkthrough = false,
  ...props
}) {
  const viewer = useViewer();
  const viewerIsAuthor = post.author.id === viewer?.id;
  const isShareable = showShare && post.shareable;
  const isEditable = showEdit && viewerIsAuthor;
  const isDeleteable = showDelete && viewerIsAuthor;
  const isResolvable =
    showResolve &&
    viewerIsAuthor &&
    !post.resolved &&
    /Advice\sRequired|Opportunity/.test(post.type);

  if (
    viewerIsAuthor &&
    !isShareable &&
    !isEditable &&
    !isDeleteable &&
    !isResolvable
  )
    return null;

  return (
    <Box display="inline-flex" alignItems="center" {...props}>
      {!viewerIsAuthor ? (
        <ReactionsButton size={size} post={post} walkthrough={walkthrough} />
      ) : null}
      {!viewerIsAuthor ? (
        <Box ml="2">
          <Connect post={post} size={size} walkthrough={walkthrough} />
        </Box>
      ) : null}
      {isShareable ? (
        <Box ml="2">
          <Share post={post} size={size} />
        </Box>
      ) : null}
      {isEditable ? (
        <Box ml={2}>
          <Edit post={post} size={size} />
        </Box>
      ) : null}
      {isDeleteable ? (
        <Box ml={2}>
          <Delete post={post} size={size} />
        </Box>
      ) : null}
      {isResolvable ? (
        <Box ml={2}>
          <Resolve post={post} size={size} />
        </Box>
      ) : null}
    </Box>
  );
}
