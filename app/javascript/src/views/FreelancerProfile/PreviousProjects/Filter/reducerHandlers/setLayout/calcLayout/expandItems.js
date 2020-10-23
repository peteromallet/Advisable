const expandItems = (acc, item, index) => {
  if (item.rowIndex + 1 === acc.numOfRows && acc.numOfRows !== 1) {
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
  const rowStart =
    prevX !== undefined
      ? Math.round(prevX + prevWidth) >= Math.round(acc.width)
      : true;
  const x = rowStart ? 0 : prevX + prevWidth;
  acc.items[index] = { ...acc.items[index], width, x, px, extraSpace };
  return { ...acc };
};

export default expandItems;
