import React, { useState, useEffect } from "react";
import { lowerDashed } from "@guild/utils";
import { feedStore } from "@guild/stores/Feed";
import { Hashtag } from "@styled-icons/heroicons-solid";
import shallow from "zustand/shallow";
import { StyledTopic } from "./styles";

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
      <Hashtag />
      {lowerDashed(topic.name)}
    </StyledTopic>
  );
};

export default Topic;
