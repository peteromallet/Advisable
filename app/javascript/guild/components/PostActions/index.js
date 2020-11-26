import React from "react";
import { Box } from "@advisable/donut";
import Share from "./Share";
import MessageAction from "./Message";
import VideoCallAction from "./VideoCall";
import ConnectionsCount from "./ConnectionsCount";
import ReactionsButton from "../Post/components/ReactionsButton";
import useViewer from "src/hooks/useViewer";

export default function PostActions({ post, ...props }) {
  const viewer = useViewer();
  const count = post.engagementsCount;
  const viewerIsAuthor = post.author.id === viewer?.id;

  if (!viewer?.guild) return null;

  return (
    <Box display="inline-flex" alignItems="center" {...props}>
      <Box mr="2">
        <ReactionsButton post={post} />
      </Box>
      {!viewerIsAuthor ? (
        <Box mr="2">
          <MessageAction post={post} />
        </Box>
      ) : null}
      {!viewerIsAuthor ? (
        <Box mr="2">
          <VideoCallAction post={post} />
        </Box>
      ) : null}
      {post.shareable ? <Share post={post} /> : null}
      {count > 0 ? <ConnectionsCount post={post} /> : null}
    </Box>
  );
}
