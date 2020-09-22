import React from "react";
import { Link } from "@advisable/donut";
import { GuildBox } from "@guild/styles";
import { lowerDashed } from "@guild/utils";
import { activeTopicStyle } from "@guild/components/Topics/components/Topic/styles";
import styled, { css } from "styled-components";

const Topics = ({ activeStyle, topics = [] }) => (
  <GuildBox
    mr="xs"
    display="flex"
    flexWrap="wrap"
    alignItems="center"
    wrapChildrenBoth={8}
  >
    {topics.map((topic, key) => (
      <StyledLink
        activeStyle={activeStyle}
        key={key}
        fontSize="xs"
        fontWeight="medium"
        color="catalinaBlue100"
        to={`/topics/${topic.id}`}
      >
        #{lowerDashed(topic.name)}
      </StyledLink>
    ))}
  </GuildBox>
);

const StyledLink = styled(Link)`
  ${({ activeStyle }) =>
    activeStyle &&
    css`
      padding: 4px 12px;

      &:hover {
        cursor: pointer;
        border-radius: 15px;
        transition: background-color 220ms;
        text-decoration: none;
        ${activeTopicStyle}
      }
    `}
`;

export default Topics;
