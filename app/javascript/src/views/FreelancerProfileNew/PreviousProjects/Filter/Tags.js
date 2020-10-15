import React, { useEffect } from "react";
import { Text, Box } from "@advisable/donut";
import { motion } from "framer-motion";

function Tags({
  sectionName,
  sectionTags,
  onClick,
  color,
  bgActive,
  addSectionParams,
  layout = {},
  ratio,
  ...props
}) {
  // Set section parameters
  useEffect(() => {
    const sectionParams = tagsList.map((tag) => {
      const element = document.getElementById(tag.key);
      const textId = tag.key + "-text";
      const name = tag.props.tagName;
      const width = element.clientWidth;
      const height = element.clientHeight;
      return { name, textId, width, height };
    });
    addSectionParams({ sectionParams, sectionName });
  }, [addSectionParams, sectionName, tagsList]);

  const tagsList = Object.keys(sectionTags)
    .sort((a, b) => sectionTags[b].number - sectionTags[a].number)
    .map((tagKey, index) => {
      const { selected } = sectionTags[tagKey];
      const item = layout[sectionName]?.items[index];
      return (
        <Box
          position="absolute"
          left={item?.x}
          top={item?.y}
          key={`${sectionName}-${tagKey}`}
          id={`${sectionName}-${tagKey}`}
          tagName={tagKey}
          sectionName={sectionName}
          // flex={ratio ? "1" : "0"}
          css={`
            white-space: nowrap;
          `}
        >
          <Box
            // display="flex"
            // textAlign="center"
            // justifyContent="center"
            px={`${item?.px}px`}
            py={`${item?.py}px`}
            mx={`${item?.mx}px`}
            my={`${item?.my}px`}
            borderRadius="8px"
            bg={bgActive}
            css={`
              user-select: none;
              cursor: pointer;
            `}
            onClick={() => onClick({ tag: tagKey })}
            {...props}
          >
            <Text
              color={color}
              fontSize="xs"
              id={`${sectionName}-${tagKey}-text`}
            >
              {tagKey}
            </Text>
          </Box>
        </Box>
      );
    });
  return (
    <Box position="relative">
      <Box
        // bg="neutral50"
        px="4px"
        ml="3px"
        mt="3px"
        mb="xxs"
        // display="inline-box"
        // position="absolute"
        // left="0"
        // top="-15px"
      >
        <Text
          color="neutral500"
          fontSize="xxs"
          fontWeight="medium"
          letterSpacing="1px"
          textTransform="uppercase"
        >
          {sectionName}
        </Text>
      </Box>
      <Box
        width={layout[sectionName]?.width}
        position="relative"
        overflow="hidden"
      >
        <Box
          as={motion.div}
          initial={{
            height: layout[sectionName]?.collapsedHeight,
          }}
          animate={{
            height: props.isExpand
              ? layout[sectionName]?.height
              : layout[sectionName]?.collapsedHeight,
          }}
          display="flex"
          flexWrap="wrap"
          alignItems="flex-start"
          alignContent="flex-start"
          justifyContent="flex-start"
        >
          {tagsList}
        </Box>
      </Box>
    </Box>
  );
}

export default Tags;
