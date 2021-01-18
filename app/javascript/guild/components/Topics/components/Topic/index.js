import React from "react";
import { lowerDashed } from "@guild/utils";
import { Hashtag } from "@styled-icons/heroicons-solid";
import { StyledTopic } from "./styles";
import { NavLink } from "react-router-dom";
import { truncate } from "lodash-es";

const Topic = ({ topic }) => (
  <StyledTopic as={NavLink} to={`/topics/${topic.id}`}>
    <span>
      <Hashtag />
      {truncate(lowerDashed(topic.name), { length: 29 })}
    </span>
  </StyledTopic>
);

export default Topic;
