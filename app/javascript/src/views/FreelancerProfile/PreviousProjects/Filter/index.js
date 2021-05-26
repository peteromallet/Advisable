import React, { useEffect, useMemo, useReducer } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Info } from "@styled-icons/feather/Info";
import styled from "styled-components";
import isEmpty from "lodash/isEmpty";
import { rgba } from "polished";
// Utilities
import { handleSectionParams, setLayout } from "./reducerHandlers";
import createDispatcher from "src/utilities/createDispatcher";
// Hooks
import useResponsiveRef from "./useResponsiveRef";
import useChildInjection from "./useChildInjection";
// Components
import { Box, Text, StyledCard, Button, theme } from "@advisable/donut";
import { ChevronDown } from "@styled-icons/feather/ChevronDown";
import { ChevronUp } from "@styled-icons/feather/ChevronUp";

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
  border: 1px solid ${theme.colors.neutral200};
`;

const StyledExpandButton = styled.button`
  position: absolute;
  cursor: pointer;
  bottom: -16px;
  background: ${theme.colors.neutral50};
  display: inline-block;
  padding: 6px 16px 6px 8px;
  border-radius: 32px;
  border: none;
  /* box-shadow: 0 1px 2px rgba(49, 49, 58, 0.1); */
  /* box-shadow: 0 1px 4px rgba(49, 49, 58, 0.1); */
  transition: box-shadow 0.2s, bottom 0.2s;

  &:hover {
    box-shadow: 0 1px 8px rgba(49, 49, 58, 0.12);
  }
  &:focus {
    outline: none;
  }
`;

function Filter({ children, skillFilters, industryFilters, clearFilters }) {
  const [state, dispatch] = useReducer(reducer, {
    sections: {},
  });
  // Actions
  const createAction = useMemo(() => createDispatcher(dispatch), []);
  const addSectionParams = useMemo(
    () => createAction("ADD_SECTION_PARAMS"),
    [createAction],
  );
  const setWrapperWidth = useMemo(
    () => createAction("SET_WRAPPER_WIDTH"),
    [createAction],
  );
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

  useEffect(() => {
    !isEmpty(state.sections) && state.wrapperWidth && setLayout({});
  }, [setLayout, state.sections, state.wrapperWidth]);

  const isExapndable =
    state.layout?.industries?.isExpandable ||
    state.layout?.skills?.isExpandable;

  const filtering = skillFilters.length > 0 || industryFilters.length > 0;

  let ariaSkillFilterLabel = "";
  let skillsFilteringStatus = [];
  skillFilters.forEach((skill, index, array) => {
    const delta = array.length - index;
    const addComma = delta > 2 || (index > 0 && delta === 2);
    const addAnd = delta === 2;
    ariaSkillFilterLabel += `${skill}${addComma ? ", " : ""}${
      addAnd ? " and " : ""
    }`;
    skillsFilteringStatus.push(
      <React.Fragment key={skill}>
        <Text as="span" fontWeight="medium" color="neutral700">
          {skill}
        </Text>
        {addComma ? ", " : null}
        {addAnd ? " and " : null}
      </React.Fragment>,
    );
  });

  let industriesFilteringStatus = null;
  let ariaIndustriesFilter = "";
  if (industryFilters.length > 0) {
    if (industryFilters.length === 1) {
      industriesFilteringStatus = (
        <Text as="span" color="neutral700">
          with{" "}
          <Text as="span" fontWeight="medium" color="neutral700">
            {industryFilters[0]}
          </Text>{" "}
          companies
        </Text>
      );
      ariaIndustriesFilter = `with ${industryFilters[0]} companies`;
    } else {
      ariaIndustriesFilter = "in multiple industries";
      industriesFilteringStatus = (
        <Text as="span" color="neutral700">
          in multiple industries
        </Text>
      );
    }
  }

  return (
    <StyledFilterCard
      variant="bordered"
      borderRadius="12px"
      mb={10}
      p={2}
      pt={2.5}
      pb={filtering ? 4 : 3}
      elevation="none"
    >
      <Box ref={layoutRef} width="100%" pb="2xs" display="flex">
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
              borderRadius="12px"
              mx="2xs"
              bg={rgba(theme.colors.neutral200, 0.72)}
              pl="s"
              py="2xs"
              pr="2xs"
            >
              <Box color="neutral700" mr="s" mb="2px">
                <Info size={18} strokeWidth={2} />
              </Box>
              <Text
                mr="auto"
                color="neutral700"
                lineHeight="130%"
                py="xs"
                aria-label={`Showing ${ariaSkillFilterLabel} projects ${ariaIndustriesFilter}`}
              >
                Showing {skillsFilteringStatus} projects{" "}
                {industriesFilteringStatus}
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
          <Box display="flex" alignItems="center" justifyContent="center">
            <Box mr="xs" color={rgba(theme.colors.neutral600, 0.9)}>
              {state.isExpand ? (
                <ChevronUp size={16} strokeWidth={2} />
              ) : (
                <ChevronDown size={16} strokeWidth={2} />
              )}
            </Box>
            <Text
              fontSize="s"
              color={rgba(theme.colors.neutral600, 0.9)}
              fontWeight="medium"
            >
              {state.isExpand ? "see less filters" : "see more filters"}
            </Text>
          </Box>
        </StyledExpandButton>
      )}
    </StyledFilterCard>
  );
}

export default Filter;
