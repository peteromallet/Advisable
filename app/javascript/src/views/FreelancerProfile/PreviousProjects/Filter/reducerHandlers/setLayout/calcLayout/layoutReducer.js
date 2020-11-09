import setSizeParams from "../setSizeParams";

const layoutReducer = (acc, item, index) => {
  const prevLayoutElement = acc.items && acc.items[index - 1];
  if (!prevLayoutElement) {
    const x = 0;
    const y = 0;
    const rowIndex = 0;
    const sizeParams = setSizeParams(rowIndex, item);
    const width = sizeParams.width;
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
  const { width } = setSizeParams(rowIndex, item);
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
  const breakpointKey = x + width;
  const newAcc = {
    ...acc,
    numOfRows,
    height,
    items: [...acc.items, itemLayout],
    breakpoints: { ...acc.breakpoints, [breakpointKey]: true },
  };
  return newAcc;
};

export default layoutReducer;
