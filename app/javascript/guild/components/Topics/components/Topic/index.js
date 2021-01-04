import React from "react";
import { lowerDashed } from "@guild/utils";
import { Hashtag } from "@styled-icons/heroicons-solid";
import { StyledTopic } from "./styles";
import { useHistory } from "react-router-dom";

const Topic = ({ topic }) => {
  const history = useHistory();
  const handleSelectedTopic = () => history.push(`/topics/${topic.id}`);

  return (
    <StyledTopic onClick={handleSelectedTopic}>
      <Hashtag />
      {lowerDashed(topic.name)}
    </StyledTopic>
  );
};

export default Topic;
