const setCollapsedHeight = (collapsedLevel, state) => {
  let collapsedHeight = 0;
  let isExpandable = true;
  for (let i = 0; i < collapsedLevel; i++) {
    collapsedHeight += state.rowsHeight[i];
    if (i >= state.numOfRows - 1) {
      isExpandable = false;
      break;
    }
  }
  return { ...state, collapsedLevel, isExpandable, collapsedHeight };
};

export default setCollapsedHeight;
