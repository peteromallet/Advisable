import React, { useEffect, useState } from "react";
import isEmpty from "lodash/isEmpty";
import truncate from "lodash/truncate";
import { rgba } from "polished";
import { motion } from "framer-motion";
import { variant } from "styled-system";
import styled from "styled-components";
import { Text, Box, useBreakpoint, theme } from "@advisable/donut";

const tagVariants = variant({
  variants: {
    skill: {
      bg: theme.colors.neutral50,
      borderColor: theme.colors.blue200,
      div: { color: theme.colors.blue400 },
      "&:hover": {
        bg: theme.colors.blue50,
      },
      "&[data-selected='true']": {
        bg: theme.colors.blue100,
        borderColor: theme.colors.blue100,
        div: { color: theme.colors.blue500 },
        "&:hover": {
          bg: rgba(theme.colors.blue100, 0.9),
          borderColor: rgba(theme.colors.blue100, 0.9),
          div: { color: rgba(theme.colors.blue500, 0.85) },
        },
      },
    },
    industry: {
      bg: theme.colors.neutral50,
      borderColor: theme.colors.cyan300,
      div: { color: theme.colors.cyan600 },
      "&:hover": {
        bg: theme.colors.cyan50,
      },
      "&[data-selected='true']": {
        bg: theme.colors.cyan100,
        borderColor: theme.colors.cyan100,
        div: { color: theme.colors.cyan700 },
        "&:hover": {
          bg: rgba(theme.colors.cyan100, 0.9),
          borderColor: rgba(theme.colors.cyan100, 0.9),
          div: { color: rgba(theme.colors.cyan700, 0.85) },
        },
      },
    },
  },
});

const Wrapper = styled(Box)`
  position: relative;
  transition: opacity 0.1s;
`;

const StyledTagText = styled.div`
  font-size: 14px;
  transition: color 0.2s;
`;

const StyledTag = styled.div`
  ${tagVariants}

  border-style: solid;
  border-width: 1px;
  border-radius: 12px;
  user-select: none;
  cursor: pointer;

  transition: background-color 0.2s, opacity 0.2s;
`;

function Tags({
  variant,
  sectionName,
  sectionTags,
  onClick,
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
            }}
            variant={variant}
            data-selected={selected}
            data-testid={`${sectionName}-filter-tag-${tagKey}`}
            onClick={() => onClick({ tag: tagKey })}
            {...props}
          >
            <StyledTagText id={`${sectionName}-${tagKey}-text`}>
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
          transform: translateY(-114%);
        `}
      >
        <Text
          color="neutral500"
          fontSize={{ _: "2xs", l: "13px" }}
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
