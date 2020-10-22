import React, { useEffect } from "react";
import { Text, Box } from "@advisable/donut";
import { motion } from "framer-motion";
import styled from "styled-components";

const StyledTag = styled(Box)`
  transition: background-color 0.2s;
  &:hover {
    background-color: ${(props) => props.bgHover};
  }
  &[data-selected="true"] {
    background-color: ${(props) => props.bgActive};
  }
  &[data-selected="true"]:hover {
    background-color: ${(props) => props.bgActiveHover};
  }
`;

const StyledTagText = styled(Text)`
  transition: color 0.2s;
  &:hover {
    color: ${(props) => props.colorHover};
  }
  &[data-selected="true"] {
    color: ${(props) => props.colorActive};
  }
  &[data-selected="true"]:hover {
    color: ${(props) => props.colorActiveHover};
  }
`;

function Tags({
  sectionName,
  sectionTags,
  onClick,
  bg,
  bgHover,
  bgActive,
  bgActiveHover,
  color,
  colorHover,
  colorActive,
  colorActiveHover,
  addSectionParams,
  layout = {},
  ...props
}) {
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
          css={`
            white-space: nowrap;
          `}
        >
          <StyledTag
            px={`${item?.px}px`}
            py={`${item?.py}px`}
            mx={`${item?.mx}px`}
            my={`${item?.my}px`}
            borderRadius="8px"
            bg={bg}
            bgHover={bgHover}
            bgActive={bgActive}
            bgActiveHover={bgActiveHover}
            data-selected={selected}
            css={`
              user-select: none;
              cursor: pointer;
            `}
            onClick={() => onClick({ tag: tagKey })}
            {...props}
          >
            <StyledTagText
              color={color}
              colorHover={colorHover}
              colorActive={colorActive}
              colorActiveHover={colorActiveHover}
              data-selected={selected}
              fontSize="xs"
              id={`${sectionName}-${tagKey}-text`}
            >
              {tagKey}
            </StyledTagText>
          </StyledTag>
        </Box>
      );
    });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box position="relative">
      <Box px="4px" ml="3px" mt="3px" mb="xxs">
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
          initial={{ height: 106 }}
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
