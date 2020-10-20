const setLayoutParam = (state) => ({
  ...state,
  layout: state.sectionKeys.reduce(
    (acc, key, index) => ({ ...acc, [key]: state.layoutSections[index] }),
    {},
  ),
});

export default setLayoutParam;
