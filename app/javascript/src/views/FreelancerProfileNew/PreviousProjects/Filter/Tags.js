import React, { useEffect } from "react";
import { Text, Box } from "@advisable/donut";

function Tags({
  sectionName,
  sectionTags,
  onClick,
  color,
  bgActive,
  addSectionParams,
  ratio,
  ...props
}) {
  // Set section parameters
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
          tagName={tagKey}
          sectionName={sectionName}
          flex={ratio ? "1" : "0"}
          css={`
            white-space: nowrap;
          `}
        >
          <Box
            display="flex"
            textAlign="center"
            justifyContent="center"
            p="s"
            borderRadius="8px"
            borderWidth={1}
            bg={selected ? bgActive : "none"}
            borderStyle="solid"
            borderColor={color}
            css={`
              user-select: none;
              cursor: pointer;
            `}
            m="6px"
            onClick={() => onClick({ tag: tagKey })}
            {...props}
          >
            <Text color={color} fontSize="xs">
              {tagKey}
            </Text>
          </Box>
        </Box>
      );
    });
  return (
    <Box width={`${ratio}%`} position="relative">
      <Box
        bg="neutral50"
        px="4px"
        ml="6px"
        display="inline-box"
        position="absolute"
        left="0"
        top="-15px"
      >
        <Text color={color} fontSize="xs">
          {sectionName}
        </Text>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        alignItems="flex-start"
        alignContent="flex-start"
        justifyContent="flex-start"
        maxHeight={props.maxHeight}
        overflow="hidden"
      >
        {tagsList}
      </Box>
    </Box>
  );
}

export default Tags;
