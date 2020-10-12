import { flow, max } from "lodash-es";

const getPY = (rowIndex) => {
  switch (rowIndex) {
    case 0:
      return 14;
    case 1:
      return 14;
    default:
      return 6;
  }
};

const getPX = (rowIndex) => {
  switch (rowIndex) {
    case 0:
      return 14;
    case 1:
      return 14;
    default:
      return 6;
  }
};

const getMY = (rowIndex) => {
  switch (rowIndex) {
    case 0:
      return 3;
    case 1:
      return 3;
    default:
      return 3;
  }
};

const getMX = (rowIndex) => {
  switch (rowIndex) {
    case 0:
      return 3;
    case 1:
      return 3;
    default:
      return 3;
  }
};

const setInitialParams = (rowIndex, item) => ({
  py: getPY(rowIndex),
  px: getPX(rowIndex),
  mx: getMX(rowIndex),
  my: getMY(rowIndex),
  initialWidth: item.width,
  initialHeight: item.height,
});

const setWidthAndHeight = (params) => ({
  ...params,
  width: params.px * 2 + params.mx * 2 + params.initialWidth,
  height: params.py * 2 + params.my * 2 + params.initialHeight,
});

const setSizeParams = flow([setInitialParams, setWidthAndHeight]);

const layoutReducer = (acc, item, index) => {
  const prevLayoutElement = acc.items && acc.items[index - 1];
  if (!prevLayoutElement) {
    const x = 0;
    const y = 0;
    const rowIndex = 0;
    const sizeParams = setSizeParams(rowIndex, item);
    const height = sizeParams.height;
    return {
      ...acc,
      height,
      numOfRows: 1,
      numOfItemsInRow: [1],
      items: [{ ...sizeParams, x, y, rowIndex }],
      breakpoints: { [x + width]: true },
    };
  }

  const prevX = prevLayoutElement.x;
  const prevY = prevLayoutElement.y;
  const prevWidth = prevLayoutElement.width;
  const prevHeigth = prevLayoutElement.height;

  // Calc row
  let rowIndex = acc.numOfRows - 1;
  let isNewRow = false;
  let numOfRows;
  let { width } = setSizeParams(rowIndex, item);
  isNewRow = prevX + prevWidth + width > acc.width;
  numOfRows = isNewRow ? acc.numOfRows + 1 : acc.numOfRows;
  rowIndex = numOfRows - 1;
  acc.numOfItemsInRow[rowIndex] = acc.numOfItemsInRow[rowIndex] + 1 || 0;

  const x = isNewRow ? 0 : prevX + prevWidth;
  const y = isNewRow ? prevY + prevHeigth : prevY;
  const sizeParams = setSizeParams(rowIndex, item);

  // Layout height
  const height = isNewRow ? acc.height + sizeParams.height : acc.height;

  const itemLayout = { ...sizeParams, x, y, rowIndex };
  return {
    ...acc,
    numOfRows,
    height,
    items: [...acc.items, itemLayout],
    breakpoints: { ...acc.breakpoints, [x + width]: true },
  };
};

const setLayout = (state) => {
  const { wrapperWidth } = state;
  let firstLayout, lastLayout;
  const firstSection =
    state.sections.skills.ratio >= state.sections.industries.ratio
      ? "skills"
      : "industries";
  const lastSection = firstSection === "skills" ? "industries" : "skills";
  let lastSectionWidth = state.sections[lastSection].maxWidth.width;
  let firstSectionWidth = wrapperWidth - lastSectionWidth;
  let success = false;
  let cycle = 0;
  while (!success && cycle < 8) {
    firstLayout = state.sections.skills.list.reduce(layoutReducer, {
      width: firstSectionWidth,
      indent: 0,
    });
    lastLayout = state.sections.industries.list.reduce(layoutReducer, {
      width: lastSectionWidth,
      indent: firstLayout.width,
    });

    // Map breakpoints from hash to list
    firstLayout.breakpoints = Object.keys(firstLayout.breakpoints)
      .map((key) => Number(key))
      .filter((num) => num !== firstSectionWidth);
    lastLayout.breakpoints = Object.keys(lastLayout.breakpoints)
      .map((key) => Number(key))
      .filter((num) => num !== lastSectionWidth);

    firstSectionWidth = max(firstLayout.breakpoints);
    lastSectionWidth = wrapperWidth - firstSectionWidth;
    success = firstLayout.numOfRows >= lastLayout.numOfRows;
    cycle += 1;
  }
  return {
    ...state,
    layout: { [firstSection]: firstLayout, [lastSection]: lastLayout },
  };
};

export default setLayout;
