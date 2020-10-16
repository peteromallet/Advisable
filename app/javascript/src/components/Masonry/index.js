import React, { useEffect, useReducer } from "react";
import {
  setInitialValues,
  setLayoutId,
  setFilteredChildren,
  setItems,
  setColumns,
  setItemsHeight,
  updateColumns,
} from "./lib";
import { Box } from "@advisable/donut";
import { flow } from "lodash-es";

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

  useEffect(() => {
    s.visibility === "hidden" && dispatch({ type: "ARRANGE_BASED_ON_HEIGHT" });
  }, [s.visibility]);

  useEffect(() => {
    s.items.length !== children.length &&
      dispatch({ type: "UPDATE", payload: { columns, gutter, children } });
  }, [columns, gutter, children, s.items.length]);

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
