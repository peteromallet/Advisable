import React from "react";
import { Text, Link, theme } from "@advisable/donut";
import { GuildBox } from "@guild/styles";
import styled from "styled-components";
import { lowerDashed } from "@guild/utils";

const Topic = ({ topic }) => {
  return (
    <StyledTopic as={Link} to={`/topics/${topic.id}`}>
      <Text fontWeight="medium" size="xs" color="catalinaBlue100">
        #{lowerDashed(topic.name)}
      </Text>
    </StyledTopic>
  );
};

const StyledTopic = styled(GuildBox)`
  padding: 6px 14px;

  &:hover {
    background-color: ${theme.colors.lavender};
    border-radius: 15px;
    color: ${theme.colors.calatlinaBlue50};
    transition: background-color 220ms;
    text-decoration: none;
  }
`;

export default Topic;
