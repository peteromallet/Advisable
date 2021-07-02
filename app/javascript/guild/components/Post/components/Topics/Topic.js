import React from "react";
import { Text } from "@advisable/donut";
import { css } from "styled-components";
import { useHistory } from "react-router-dom";

const Topic = ({ topic }) => {
  const history = useHistory();
  const handleClick = () => history.push(`/topics/${topic.slug}`);

  return (
    <Text
      onClick={handleClick}
      fontSize="m"
      lineHeight="24px"
      py={0.5}
      fontWeight="medium"
      color="neutral400"
      mr={2}
      css={css`
        outline: none;
        &:hover {
          cursor: pointer;
        }
      `}
    >
      #{topic.slug}
    </Text>
  );
};

export default Topic;
