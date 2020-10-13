import React, { useEffect, useMemo, useReducer } from "react";
import { Box, Text } from "@advisable/donut";
import createDispatcher from "src/utilities/createDispatcher";
import { isEmpty } from "lodash-es";
import useResponsiveRef from "./useResponsiveRef";
import useChildInjection from "./useChildInjection";
import {
  setSectionsRatio,
  handleSectionParams,
  setLayout,
} from "./reducerHandlers";

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

  const isExapndable =
    state.layout?.industries.isExpandable || state.layout?.skills.isExpandable;

  return (
    <Box
      position="relative"
      display="flex"
      flexWrap="wrap"
      justifyContent="center"
      borderRadius="8px"
      mb="xl"
      p="8px 6px 12px 6px"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="neutral300"
    >
      <Box ref={layoutRef} width="100%" display="flex">
        {sections}
      </Box>
      {isExapndable && (
        <Box
          position="absolute"
          bottom="-12px"
          bg="neutral50"
          display="inline-block"
          p="xxs"
          onClick={expandCollapse}
          css={`
            cursor: pointer;
          `}
        >
          <Text fontSize="xs" color="neutral600">
            {state.isExpand ? "Collapse" : "Expand"}
          </Text>
        </Box>
      )}
    </Box>
  );
}

export default Filter;
