import flow from "lodash/flow";
import max from "lodash/max";
import layoutReducer from "./layoutReducer";
import expandItems from "./expandItems";
import setCollapsedHeight from "./setCollapsedHeight";

const initLoopParams = (state) => ({
  ...state,
  success: false,
  cycle: 0,
  layoutSections: [],
});

const arrangeItems = (state) => ({
  ...state,
  layoutSections: state.sectionKeys.map((sectionKey, index) =>
    state.sections[sectionKey].list.reduce(layoutReducer, {
      width: state.sectionsWidth[index],
      order: index + 1,
      indent: state.sectionsWidth[index - 1] || 0,
    }),
  ),
});

const setGaps = (state) => ({
  ...state,
  gaps: state.layoutSections.map(
    (layout) => layout.width - max(layout.rowsWidth),
  ),
});

const setGapSum = (state) => ({
  ...state,
  gapSum: state.gaps.reduce((acc, gap) => acc + gap, 0),
});

const setMaxRowInds = (state) => ({
  ...state,
  maxRowInds: state.layoutSections.reduce((acc, layout) => {
    const { maxValInd } = layout.rowsWidth.reduce(
      (valAcc, val, index) => {
        return val > valAcc.maxVal ? { maxVal: val, maxValInd: index } : valAcc;
      },
      { maxVal: -Infinity, maxValInd: -1 },
    );
    return [...acc, maxValInd >= 0 ? maxValInd : undefined];
  }, []),
});

const setNumOfItemsToSpread = (state) => ({
  ...state,
  numOfItemsToSpread: state.layoutSections.reduce((acc, layout, index) => {
    const maxRowInd = state.maxRowInds[index];
    return acc + layout.numOfItemsInRow[maxRowInd];
  }, 0),
});

const setSpreadPerItemParam = (state) => ({
  ...state,
  spreadPerItem: state.gapSum / state.numOfItemsToSpread,
});

const updateLayoutSectionWidth = (state) => ({
  ...state,
  layoutSections: state.layoutSections.map((layoutSection, index) => {
    const maxRowInd = state.maxRowInds[index];
    const numOfItems = layoutSection.numOfItemsInRow[maxRowInd];
    const width =
      layoutSection.width -
      state.gaps[index] +
      state.spreadPerItem * numOfItems;
    return { ...layoutSection, width };
  }),
});

const expandTags = (state) => ({
  ...state,
  layoutSections: state.layoutSections.map((layout) =>
    layout.items.reduce(expandItems, layout),
  ),
});

const setCollapsedHeightLevel = (state) => ({
  ...state,
  layoutSections: state.layoutSections.map((layout) =>
    setCollapsedHeight(2, layout),
  ),
});

const mapBreakpointsFromHashToList = (state) => ({
  ...state,
  layoutSections: state.layoutSections.map((layout, index) => {
    layout.breakpoints = Object.keys(layout.breakpoints)
      .map((key) => Number(key))
      .filter((num) => num !== state.sectionsWidth[index]);
    return layout;
  }),
});

const updateSectionsWidth = (state) => ({
  ...state,
  sectionsWidth: state.layoutSections.reduce(
    (acc, layoutSections, index) => {
      let width =
        index === 0
          ? max(layoutSections.breakpoints)
          : state.wrapperWidth - acc.sum;
      const sum = acc.sum + width;
      return { widths: [...acc.widths, width], sum };
    },
    { widths: [], sum: 0 },
  ).widths,
});

const measureSuccess = (state) => ({
  ...state,
  success: state.layoutSections.reduce(
    (acc, layoutSection, index, layoutSections) => {
      const nextLayout = layoutSections[index + 1];
      if (!nextLayout) return acc;
      return layoutSection.numOfRows >= nextLayout.numOfRows;
    },
    true,
  ),
});

const incCycle = (state) => ({
  ...state,
  cycle: state.cycle + 1,
});

const updateState = flow([
  arrangeItems,
  setGaps,
  setGapSum,
  setMaxRowInds,
  setNumOfItemsToSpread,
  setSpreadPerItemParam,
  updateLayoutSectionWidth,
  expandTags,
  setCollapsedHeightLevel,
  mapBreakpointsFromHashToList,
  updateSectionsWidth,
  measureSuccess,
  incCycle,
]);

const calcLayout = (state) => {
  state = initLoopParams(state);
  while (!state.success && state.cycle < 100) {
    state = updateState(state);
  }
  return state;
};

export default calcLayout;
