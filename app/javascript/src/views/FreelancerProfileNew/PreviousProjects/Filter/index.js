import React, { useEffect, useMemo, useReducer } from "react";
import { Box, Text, StyledCard, theme } from "@advisable/donut";
import { rgba } from "polished";
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
  padding: 9px 18px;
  border-radius: 32px;
  /* box-shadow: 0 1px 2px rgba(49, 49, 58, 0.1); */
  box-shadow: 0 1px 6px rgba(49, 49, 58, 0.12);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 1px 10px rgba(49, 49, 58, 0.12);
  }
`;

function Filter(props) {
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
  const sections = useChildInjection(props.children, (child) => ({
    addSectionParams,
    isExpand: state.isExpand,
    wrapperWidth: state.wrapperWidth,
    layout: state.layout,
    ratio: state.sections[child.props.sectionName]?.ratio,
  }));

  // Set ratio of sections
  useEffect(() => {
    !isEmpty(state.sections) && setSectionsRatio({});
    !isEmpty(state.sections) && setLayout({});
  }, [setLayout, setSectionsRatio, state.sections]);

  useEffect(() => {
    !isEmpty(state.sections) && state.wrapperWidth && setLayout({});
  }, [setLayout, state.sections, state.wrapperWidth]);

  const isExapndable =
    state.layout?.industries.isExpandable || state.layout?.skills.isExpandable;

  return (
    <StyledFilterCard
      borderRadius="8px"
      mb="xl"
      p="8px 6px 12px 6px"
      elevation="m"
      // borderWidth="1px"
      // borderStyle="solid"
      // borderColor="neutral300"
    >
      <Box ref={layoutRef} width="100%" display="flex" mb="xs">
        {sections}
      </Box>
      {isExapndable && (
        <StyledExpandButton onClick={expandCollapse}>
          <Text fontSize="xs" color="neutral700">
            {state.isExpand ? "see less" : "see more"}
          </Text>
        </StyledExpandButton>
      )}
    </StyledFilterCard>
  );
}

export default Filter;
