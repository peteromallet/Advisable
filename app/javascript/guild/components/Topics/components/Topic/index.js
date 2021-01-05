import React from "react";
import { lowerDashed } from "@guild/utils";
import { Hashtag } from "@styled-icons/heroicons-solid";
import { StyledTopic } from "./styles";
import { NavLink } from "react-router-dom";

const Topic = ({ topic }) => (
  <StyledTopic as={NavLink} to={`/topics/${topic.id}`}>
    <Hashtag />
    {lowerDashed(topic.name)}
  </StyledTopic>
);

export default Topic;
