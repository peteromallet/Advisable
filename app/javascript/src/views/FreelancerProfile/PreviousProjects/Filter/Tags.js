import React, { useEffect, useState } from "react";
import { Text, Box, useBreakpoint } from "@advisable/donut";
import { motion } from "framer-motion";
import styled from "styled-components";
import { isEmpty, truncate } from "lodash";

const Wrapper = styled(Box)`
  position: relative;
  transition: opacity 0.1s;
`;

const StyledTag = styled(Box)`
  transition: background-color 0.2s, opacity 0.2s;
  &:hover {
    background-color: ${(props) => props.bgHover};
    border-color: ${(props) => props.borderColorHover};
  }
  &[data-selected="true"] {
    background-color: ${(props) => props.bgActive};
    border-color: ${(props) => props.borderColorActive};
  }
  &[data-selected="true"]:hover {
    background-color: ${(props) => props.bgActiveHover};
    border-color: ${(props) => props.borderColorActiveHover};
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
  borderWidth = 0,
  borderColor,
  borderColorHover,
  borderColorActive,
  borderColorActiveHover,
  addSectionParams,
  layout = {},
  ...props
}) {
  const isMobile = useBreakpoint("s");
  const [rendered, setRendered] = useState(false);
  const tagsList = Object.keys(sectionTags)
    .sort((a, b) => sectionTags[b].number - sectionTags[a].number)
    .map((tagKey, index) => {
      const { selected } = sectionTags[tagKey];
      const item = layout[sectionName]?.items[index];
      const tagText = truncate(tagKey, { length: isMobile ? 24 : 38 });
      return (
        <Box
          position="absolute"
          sectionName={sectionName}
          id={`${sectionName}-${tagKey}`}
          key={`${sectionName}-${tagKey}`}
          tagName={tagKey}
          style={{ left: item?.x, top: item?.y }}
          css={`
            white-space: nowrap;
          `}
        >
          <StyledTag
            style={{
              padding: `${item?.py}px ${item?.px}px`,
              margin: `${item?.my}px ${item?.mx}px`,
              borderWidth: borderWidth,
            }}
            data-testid={`${sectionName}-filter-tag-${tagKey}`}
            borderRadius="12px"
            borderStyle="solid"
            borderColor={borderColor}
            borderColorHover={borderColorHover}
            borderColorActive={borderColorActive}
            borderColorActiveHover={borderColorActiveHover}
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
              {tagText}
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

  // Set rendered to true
  useEffect(() => {
    !isEmpty(layout) && setRendered(true);
  }, [layout]);

  return (
    <Wrapper style={{ opacity: rendered ? 1 : 0 }}>
      <Box
        position="absolute"
        bg="neutral50"
        top="0"
        left="6px"
        px="4px"
        css={`
          transform: translateY(-130%);
        `}
      >
        <Text
          color="neutral500"
          fontSize={{ _: "2xs", l: "xs" }}
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
          transition={!rendered && { duration: 0 }}
          display="flex"
          flexWrap="wrap"
          alignItems="flex-start"
          alignContent="flex-start"
          justifyContent="flex-start"
        >
          {tagsList}
        </Box>
      </Box>
    </Wrapper>
  );
}

export default Tags;
