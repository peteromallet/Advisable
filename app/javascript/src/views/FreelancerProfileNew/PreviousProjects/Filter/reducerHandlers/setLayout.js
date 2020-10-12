import { flow, max } from "lodash-es";

const getPY = (rowIndex) => {
  // Return padding Y axis value
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
  // Return padding X axis value
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
  // Return margin Y axis value
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
  // Return margin X axis value
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
      rowsWidth: [sizeParams.width],
      rowsHeight: [sizeParams.height],
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
  const sizeParams = setSizeParams(rowIndex, item);
  acc.numOfItemsInRow[rowIndex] = acc.numOfItemsInRow[rowIndex] + 1 || 1;
  acc.rowsWidth[rowIndex] =
    acc.rowsWidth[rowIndex] + sizeParams.width || sizeParams.width;
  acc.rowsHeight[rowIndex] = isNewRow
    ? sizeParams.height
    : acc.rowsHeight[rowIndex];

  const x = isNewRow ? 0 : prevX + prevWidth;
  const y = isNewRow ? prevY + prevHeigth : prevY;

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

const expandItems = (acc, item, index) => {
  if (item.rowIndex + 1 === acc.numOfRows) {
    // Not expand for last row
    return acc;
  }
  const rowWidth = acc.rowsWidth[item.rowIndex];
  const rowNumOfItems = acc.numOfItemsInRow[item.rowIndex];
  const diff = acc.width - rowWidth;
  const extraSpace = diff / rowNumOfItems;
  const px = item.px + extraSpace / 2;
  const width = item.width + extraSpace;

  // set Coordinations
  const prevX = acc.items[index - 1]?.x;
  const prevWidth = acc.items[index - 1]?.width;
  const rowStart = prevX !== undefined ? prevX + prevWidth >= acc.width : true;
  const x = rowStart ? 0 : prevX + prevWidth;
  acc.items[index] = { ...acc.items[index], width, x, px, extraSpace };
  return { ...acc };
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
    // Calc first layout
    firstLayout = state.sections.skills.list.reduce(layoutReducer, {
      width: firstSectionWidth,
      indent: 0,
    });
    firstLayout = firstLayout.items.reduce(expandItems, firstLayout);
    // Calc last layout
    lastLayout = state.sections.industries.list.reduce(layoutReducer, {
      width: lastSectionWidth,
      indent: firstLayout.width,
    });
    lastLayout = lastLayout.items.reduce(expandItems, lastLayout);
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
