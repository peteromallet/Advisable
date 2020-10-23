const setSectionKeys = (state) => ({
  ...state,
  sectionKeys: Object.keys(state.sections)
    .filter((key) => state.sections[key].list.length)
    .sort((a, b) => state.sections[b].ratio - state.sections[a].ratio),
});

export default setSectionKeys;
