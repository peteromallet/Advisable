import React, { useState, useEffect } from "react";
import { Text, theme } from "@advisable/donut";
import { GuildBox } from "@guild/styles";
import styled, { css } from "styled-components";
import { lowerDashed } from "@guild/utils";
import { feedStore } from "@guild/stores/Feed";
import shallow from "zustand/shallow";

const Topic = ({ topic }) => {
  const [selectedTopics, updateSelectedTopics] = feedStore(
    ({ selectedTopics, updateSelectedTopics }) => [
      selectedTopics,
      updateSelectedTopics,
    ],
    shallow,
  );

  const isStoreSelected = selectedTopics.includes(topic);
  const [selected, setSelected] = useState(isStoreSelected);

  const handleSelectedTopic = () => {
    updateSelectedTopics(topic);
    setSelected(!selected);
  };

  useEffect(() => {
    if (selected && !isStoreSelected) setSelected(false);
  }, [isStoreSelected, selected, topic]);

  return (
    <StyledTopic selected={selected} onClick={handleSelectedTopic}>
      <Text fontWeight="medium" size="xs" color="catalinaBlue100">
        #{lowerDashed(topic.name)}
      </Text>
    </StyledTopic>
  );
};

const activeStyle = css`
  background-color: ${theme.colors.lavender};
  color: ${theme.colors.calatlinaBlue50};
`;

const StyledTopic = styled(GuildBox)`
  padding: 6px 14px;
  border-radius: 15px;

  ${({ selected }) => selected && activeStyle}

  &:hover {
    cursor: pointer;
    border-radius: 15px;
    transition: background-color 220ms;
    text-decoration: none;
    ${activeStyle}
  }
`;

export default Topic;
