import React from "react";
import { Text } from "@advisable/donut";
import { lowerDashed } from "@guild/utils";
import { css } from "styled-components";
import { useHistory } from "react-router-dom";

const Topic = ({ topic }) => {
  const history = useHistory();
  const handleClick = () => history.push(`/topics/${topic.id}`);

  return (
    <Text
      onClick={handleClick}
      fontSize="s"
      fontWeight="medium"
      color="neutral400"
      css={css`
        outline: none;
        &:hover {
          cursor: pointer;
        }
      `}
    >
      #{lowerDashed(topic.name)}
    </Text>
  );
};

export default Topic;
