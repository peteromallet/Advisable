import React from "react";
import { GuildBox } from "@guild/styles";
import Topic from "./Topic";

const Topics = ({ topics = [] }) => (
  <GuildBox
    mr="xs"
    display="flex"
    flexWrap="wrap"
    alignItems="center"
    wrapChildrenBoth={8}
  >
    {topics.map((topic, key) => (
      <Topic key={key} topic={topic} />
    ))}
  </GuildBox>
);

export default Topics;
