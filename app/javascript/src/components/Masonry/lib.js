import React from "react";
import generateID from "src/utilities/generateID";

export const setInitialValues = ({ children, columns, gutter }) => ({
  children,
  numOfColumns: columns,
  height: 0,
  spacing: gutter / 2,
  visibility: "hidden",
});

export const setLayoutId = (state) => ({
  ...state,
  layoutId: generateID("layout"),
});

export const setFilteredChildren = (state) => {
  const filteredChildren = [];
  React.Children.forEach(state.children, (child) => {
    child && filteredChildren.push(React.cloneElement(child));
  });
  return { ...state, filteredChildren };
};

export const setItems = (state) => ({
  ...state,
  items: state.filteredChildren.map((child, index) => ({
    element: child,
    id: `${state.layoutId}-${index}`,
    colIndex: index % state.numOfColumns,
    height: 0,
  })),
});

const initColumns = (numOfColumns) =>
  Array.from({ length: numOfColumns }, () => ({ height: 0, items: [] }));

const reduceItemsToColumns = (acc, item) => {
  acc[item.colIndex].items = [...acc[item.colIndex].items, item];
  return acc;
};

export const setColumns = (state) => ({
  ...state,
  columns: state.items.reduce(
    reduceItemsToColumns,
    initColumns(state.numOfColumns),
  ),
});

export const setItemsHeight = (state) => ({
  ...state,
  items: state.items.map((item) => {
    const element = document.getElementById(item.id);
    const height = element.clientHeight;
    return { ...item, height };
  }),
});

const minIndexBy = (array, param) =>
  array.reduce((minIndex, obj, index, array) => {
    const minIndexHeight = array[minIndex] ? array[minIndex][param] : Infinity;
    return obj[param] < minIndexHeight ? index : minIndex;
  }, Infinity);

const reduceItemsToColumnsByHeight = (acc, item) => {
  const minHeightColumnIndex = minIndexBy(acc, "height");
  acc[minHeightColumnIndex].height += item.height;
  acc[minHeightColumnIndex].items = [...acc[minHeightColumnIndex].items, item];
  return acc;
};

export const updateColumns = (state) => ({
  ...state,
  columns: state.items.reduce(
    reduceItemsToColumnsByHeight,
    initColumns(state.numOfColumns),
  ),
  visibility: true,
});
