import React from "react";
import { Hashtag } from "@styled-icons/heroicons-solid/Hashtag";
import { StyledTopic } from "./styles";
import { NavLink } from "react-router-dom";
import truncate from "lodash/truncate";

const Topic = ({ topic }) => (
  <StyledTopic as={NavLink} to={`/guild/topics/${topic.slug}`}>
    <span>
      <Hashtag />
      {truncate(topic.slug, { length: 24 })}
    </span>
  </StyledTopic>
);

export default Topic;
