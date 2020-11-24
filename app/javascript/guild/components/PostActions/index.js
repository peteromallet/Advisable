import React from "react";
import pluralize from "src/utilities/pluralize";
import { Box, Text } from "@advisable/donut";
import MessageAction from "./Message";
import VideoCallAction from "./VideoCall";
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
        {count > 0 ? (
          <Text ml="1" fontSize="sm" color="neutral500">
            {pluralize(count, "connection", "connections")}
          </Text>
        ) : null}
      </Box>
    </>
  );
}
