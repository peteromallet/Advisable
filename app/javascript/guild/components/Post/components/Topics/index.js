import React from "react";
import { Text } from "@advisable/donut";
import { GuildBox } from "@guild/styles";
import { lowerDashed } from "@guild/utils";

const Topics = ({ topics = [] }) => (
  <GuildBox
    mr="xs"
    display="flex"
    flexWrap="wrap"
    alignItems="center"
    wrapChildrenBoth={8}
  >
    {topics.map((topic, key) => (
      <Text key={key} fontSize="xs" fontWeight="medium" color="catalinaBlue100">
        #{lowerDashed(topic.name)}
      </Text>
    ))}
  </GuildBox>
);

export default Topics;
