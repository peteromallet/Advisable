import React, { useEffect } from "react";
import { Text, Box } from "@advisable/donut";

function Tags({
  sectionName,
  sectionTags,
  switchTagSelection,
  addSectionParams,
  ...props
}) {
  useEffect(() => {
    const sectionParams = tagsList.map((tag) => {
      const element = document.getElementById(tag.key);
      const name = tag.props.tagName;
      const width = element.clientWidth;
      const height = element.clientHeight;
      return { name, width, height };
    });
    addSectionParams({ sectionParams, sectionName });
  }, [addSectionParams, sectionName, tagsList]);

  const tagsList = Object.keys(sectionTags)
    .sort((a, b) => sectionTags[b].number - sectionTags[a].number)
    .map((tagKey) => {
      const { selected } = sectionTags[tagKey];
      return (
        <Box
          key={`${sectionName}-${tagKey}`}
          id={`${sectionName}-${tagKey}`}
          sectionName={sectionName}
          tagName={tagKey}
          display="flex"
          position="absolute"
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          p="s"
          borderRadius="8px"
          borderWidth={1}
          bg={selected ? "blue100" : "none"}
          borderStyle="solid"
          borderColor="blue500"
          css={`
            user-select: none;
            cursor: pointer;
          `}
          m="6px"
          onClick={() => switchTagSelection({ tag: tagKey })}
          {...props}
        >
          <Text color="blue500" fontSize="xs">
            {tagKey}
          </Text>
          <Text ml="s" color="blue500" fontSize="xs">
            {sectionTags[tagKey].number}
          </Text>
        </Box>
      );
    });
  return <>{tagsList}</>;
}

export default Tags;
