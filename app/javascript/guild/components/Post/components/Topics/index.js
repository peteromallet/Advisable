import React from "react";
import { GuildBox } from "@guild/styles";
import Topic from "./Topic";

const Topics = ({ topics = [], walkthrough = false }) => (
  <GuildBox
    mr="xs"
    display="flex"
    flexWrap="wrap"
    alignItems="center"
    wrapChildrenHorizontal={8}
    data-walkthrough={walkthrough ? "postTopic" : null}
  >
    {topics.map((topic, key) => (
      <Topic key={key} topic={topic} />
    ))}
  </GuildBox>
);

export default Topics;
