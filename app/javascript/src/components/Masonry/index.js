import React, { useEffect, useReducer } from "react";
import {
  setInitialValues,
  setLayoutId,
  setFilteredChildren,
  setItems,
  setColumns,
  setItemsHeight,
  updateColumns,
  filterChildren,
} from "./lib";
import { Box } from "@advisable/donut";
import flow from "lodash/flow";

const initState = flow([
  setInitialValues,
  setLayoutId,
  setFilteredChildren,
  setItems,
  setColumns,
]);

const arrangeBasedOnHeight = flow([setItemsHeight, updateColumns]);

const reducer = (state, action) => {
  switch (action.type) {
    case "ARRANGE_BASED_ON_HEIGHT":
      return arrangeBasedOnHeight(state);
    case "UPDATE":
      return initState({ ...action.payload });
    default:
      return state;
  }
};

function Masonry({ children, columns = 2, gutter = 20 }) {
  const [s, dispatch] = useReducer(
    reducer,
    { children, columns, gutter },
    initState,
  );

  // Arrange/Rearrange layout effect
  useEffect(() => {
    s.visibility === "hidden" && dispatch({ type: "ARRANGE_BASED_ON_HEIGHT" });
  }, [s.visibility]);

  // Update parameters effect
  useEffect(() => {
    const newFilteredChildren = filterChildren(children);
    const diffNumOfChildren =
      newFilteredChildren.length !== s.filteredChildren.length;
    const diffChildrenKey = newFilteredChildren.some(
      (child, index) => child.key !== s.filteredChildren[index]?.key,
    );
    const childrenUpdate = diffNumOfChildren || diffChildrenKey;
    const numOfColumnsUpdate = s.numOfColumns !== columns;
    const gutterUpdate = s.gutter !== gutter;
    (childrenUpdate || numOfColumnsUpdate || gutterUpdate) &&
      dispatch({ type: "UPDATE", payload: { columns, gutter, children } });
  }, [children, columns, gutter, s.filteredChildren, s.gutter, s.numOfColumns]);

  return (
    <Box
      display="flex"
      mx={`-${s.spacing}px`}
      mt={`-${s.spacing}px`}
      style={{ visibility: s.visibility }}
    >
      {s.columns.map((col, col_index) => (
        <Box width="100%" key={col_index + 1}>
          {col.items.map((item) => (
            <Box key={item.id} id={item.id} p={`${s.spacing}px`}>
              {item.element}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default Masonry;
