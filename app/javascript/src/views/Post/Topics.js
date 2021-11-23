import React from "react";
import { GuildBox } from "@guild/styles";
import { Text } from "@advisable/donut";

const Topic = ({ topic }) => {
  return (
    <Text
      fontSize="m"
      lineHeight="24px"
      py={0.5}
      fontWeight="medium"
      color="neutral400"
      mr={2}
    >
      #{topic.slug}
    </Text>
  );
};

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
