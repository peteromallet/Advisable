import React, { useEffect, useMemo, useReducer } from "react";
import { Box } from "@advisable/donut";
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
  const [layoutRef] = useResponsiveRef(setWrapperWidth);
  const sections = useChildInjection(props.children, (child) => ({
    addSectionParams,
    wrapperWidth: state.wrapperWidth,
    layout: state.layout,
    ratio: state.sections[child.props.sectionName]?.ratio,
  }));

  // Set ratio of sections
  useEffect(() => {
    !isEmpty(state.sections) && setSectionsRatio({});
    !isEmpty(state.sections) && setLayout({});
  }, [setLayout, setSectionsRatio, state.sections]);

  return (
    <Box ref={layoutRef} width="100%" display="flex">
      {sections}
    </Box>
  );
}

export default Filter;
