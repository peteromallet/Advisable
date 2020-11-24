import React from "react";
import { Box } from "@advisable/donut";
import MessageAction from "./Message";
import VideoCallAction from "./VideoCall";
import ConnectionsCount from "./ConnectionsCount";
import ReactionsButton from "../Post/components/ReactionsButton";

export default function PostActions({ post }) {
  const count = post.engagementsCount;

  return (
    <>
      <Box display="inline-flex" alignItems="center">
        <Box mr="2">
          <ReactionsButton post={post} />
        </Box>
        <Box mr="2">
          <MessageAction post={post} />
        </Box>
        <Box mr="2">
          <VideoCallAction post={post} />
        </Box>
        {count > 0 ? <ConnectionsCount post={post} /> : null}
      </Box>
    </>
  );
}
