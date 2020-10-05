import { max } from "lodash-es";

const getPaddingY = (rowIndex) => {
  switch (rowIndex) {
    case 0:
      return "10px";
    case 1:
      return "6px";
    default:
      return "4px";
  }
};

const layoutReducer = (acc, item, index) => {
  const { width, height } = item;
  const prevLayoutElement = acc.items && acc.items[index - 1];
  if (!prevLayoutElement) {
    const x = 0;
    const y = 0;
    return {
      ...acc,
      numOfRows: 1,
      items: [{ x, y, width, height }],
      breakpoints: { [x + width]: true },
    };
  }

  const prevX = prevLayoutElement.x;
  const prevY = prevLayoutElement.y;
  const prevWidth = prevLayoutElement.width;
  const prevHeigth = prevLayoutElement.height;
  const isNewRow = prevX + prevWidth + item.width > acc.width;
  const numOfRows = isNewRow ? acc.numOfRows + 1 : acc.numOfRows;
  const rowIndex = numOfRows - 1;
  const x = isNewRow ? 0 : prevX + prevWidth;
  const y = isNewRow ? prevY + prevHeigth : prevY;
  const py = getPaddingY(rowIndex);

  const itemLayout = { x, y, py, width, height, rowIndex };
  return {
    ...acc,
    numOfRows,
    items: [...acc.items, itemLayout],
    breakpoints: { ...acc.breakpoints, [x + width]: true },
  };
};

const setLayout = (state) => {
  console.log("set layout", state);
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

    console.log("first layout", firstLayout);
    console.log("last layout", lastLayout);
    console.log("num of rows", firstLayout.numOfRows, lastLayout.numOfRows);
    console.log("section width", firstSectionWidth, lastSectionWidth);

    firstSectionWidth = max(firstLayout.breakpoints);
    lastSectionWidth = wrapperWidth - firstSectionWidth;
    success = firstLayout.numOfRows >= lastLayout.numOfRows;
    cycle += 1;
    console.log("success", success);
  }
  return {
    ...state,
    layout: { [firstSection]: firstLayout, [lastSection]: lastLayout },
  };
};

export default setLayout;
