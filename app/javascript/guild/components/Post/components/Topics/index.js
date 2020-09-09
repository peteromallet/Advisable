import React from "react";
import { Link } from "@advisable/donut";
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
      <Link
        key={key}
        fontSize="xs"
        color="catalinaBlue100"
        to={`/topics/${topic.id}`}
      >
        #{lowerDashed(topic.name)}
      </Link>
    ))}
  </GuildBox>
);

export default Topics;
