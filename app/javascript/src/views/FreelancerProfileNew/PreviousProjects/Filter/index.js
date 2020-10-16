import React, { useEffect, useMemo, useReducer } from "react";
import { Box, Text, StyledCard, Button, theme } from "@advisable/donut";
import { rgba } from "polished";
import { Info } from "@styled-icons/feather";
import createDispatcher from "src/utilities/createDispatcher";
import { isEmpty } from "lodash-es";
import useResponsiveRef from "./useResponsiveRef";
import useChildInjection from "./useChildInjection";
import {
  setSectionsRatio,
  handleSectionParams,
  setLayout,
} from "./reducerHandlers";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import FilterDescription from "./FilterDescription";

function arrayToSentence(array) {
  return (
    array.slice(0, -2).join(", ") +
    (array.slice(0, -2).length ? ", " : "") +
    array.slice(-2).join(" and ")
  );
}

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_WRAPPER_WIDTH":
      return { ...state, wrapperWidth: action.payload };
    case "ADD_SECTION_PARAMS":
      return handleSectionParams(
        state,
        action.payload.sectionName,
        action.payload.sectionParams,
      );
    case "SET_SECTIONS_RATIO":
      return setSectionsRatio(state);
    case "SET_LAYOUT":
      return setLayout(state);
    case "EXPAND_COLLAPSE":
      return { ...state, isExpand: !state.isExpand };
    default:
      return state;
  }
};

const StyledFilterCard = styled(StyledCard)`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const StyledExpandButton = styled(StyledCard)`
  position: absolute;
  cursor: pointer;
  bottom: -16px;
  background: white;
  display: inline-block;
  padding: 8px 16px;
  border-radius: 32px;
  /* box-shadow: 0 1px 2px rgba(49, 49, 58, 0.1); */
  box-shadow: 0 1px 6px rgba(49, 49, 58, 0.12);
  transition: box-shadow 0.2s, bottom 0.2s;

  &:hover {
    box-shadow: 0 1px 10px rgba(49, 49, 58, 0.12);
  }
`;

function Filter({ children, skillFilters, industryFilters, clearFilters }) {
  const [state, dispatch] = useReducer(reducer, {
    sections: {},
  });
  // Actions
  const createAction = useMemo(() => createDispatcher(dispatch), []);
  const addSectionParams = useMemo(() => createAction("ADD_SECTION_PARAMS"), [
    createAction,
  ]);
  const setWrapperWidth = useMemo(() => createAction("SET_WRAPPER_WIDTH"), [
    createAction,
  ]);
  const setSectionsRatio = useMemo(() => createAction("SET_SECTIONS_RATIO"), [
    createAction,
  ]);
  const setLayout = useMemo(() => createAction("SET_LAYOUT"), [createAction]);
  const expandCollapse = createAction("EXPAND_COLLAPSE");
  const [layoutRef] = useResponsiveRef(setWrapperWidth);
  const sections = useChildInjection(children, (child) => ({
    addSectionParams,
    isExpand: state.isExpand,
    wrapperWidth: state.wrapperWidth,
    layout: state.layout,
    order: state.layout && state.layout[child.props.sectionName].order,
    ratio: state.sections[child.props.sectionName]?.ratio,
  })).sort((a, b) => a.props.order - b.props.order);

  // Set ratio of sections
  useEffect(() => {
    !isEmpty(state.sections) && setSectionsRatio({});
    !isEmpty(state.sections) && setLayout({});
  }, [setLayout, setSectionsRatio, state.sections]);

  useEffect(() => {
    !isEmpty(state.sections) && state.wrapperWidth && setLayout({});
  }, [setLayout, state.sections, state.wrapperWidth]);

  const isExapndable =
    state.layout?.industries?.isExpandable ||
    state.layout?.skills?.isExpandable;

  const filtering = skillFilters.length > 0 || industryFilters.length > 0;

  let output = "";

  if (skillFilters.length > 0) {
    output = `Showing ${arrayToSentence(skillFilters)} projects`;
  }

  if (industryFilters.length > 0) {
    if (industryFilters.length === 1) {
      output += ` with ${industryFilters[0]} companies`;
    } else {
      output += " in multiple industries";
    }
  }

  const filtering = skillFilters.length > 0 || industryFilters.length > 0;

  return (
    <StyledFilterCard borderRadius="8px" mb="xl" pb="xs" elevation="m">
      <Box
        ref={layoutRef}
        width="100%"
        m="8px 6px 0px 6px"
        pb="6px"
        display="flex"
      >
        {sections}
      </Box>
      <AnimatePresence initial={false}>
        {filtering && (
          <Box
            as={motion.div}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
            overflow="hidden"
            width="100%"
          >
            <Box
              display="flex"
              alignItems="center"
              borderRadius="8px"
              mx="xs"
              bg={rgba(theme.colors.neutral100, 0.9)}
              pl="s"
              py="xxs"
              pr="xxs"
            >
              <Box color="neutral600" mr="s" mb="2px">
                <Info size={18} strokeWidth={2} />
              </Box>
              <Text mr="auto" color="neutral600">
                {output}
              </Text>
              <Button size="s" variant="ghost" onClick={clearFilters}>
                Clear Filters
              </Button>
            </Box>
          </Box>
        )}
      </AnimatePresence>
      {isExapndable && (
        <StyledExpandButton onClick={expandCollapse}>
          <Text fontSize="xs" color="neutral700">
            {state.isExpand ? "see less filters" : "see more filters"}
          </Text>
        </StyledExpandButton>
      )}
    </StyledFilterCard>
  );
}

export default Filter;
