import flow from "lodash/flow";
import { theme } from "@advisable/donut";

const getParams = (rowIndex) => {
  const query = `(max-width: ${theme.breakpoints[0]})`;
  const isMobile = window.matchMedia(query)?.matches;
  switch (rowIndex) {
    case 0:
      return {
        fontSize: isMobile ? 12 : 15,
        py: isMobile ? 10 : 16,
        px: isMobile ? 5 : 16,
        my: 4,
        mx: 4,
      };
    case 1:
      return {
        fontSize: isMobile ? 12 : 15,
        py: isMobile ? 10 : 16,
        px: isMobile ? 5 : 16,
        my: 4,
        mx: 4,
      };
    default:
      return {
        fontSize: isMobile ? 12 : 13,
        py: 10,
        px: 5,
        my: 4,
        mx: 4,
      };
  }
};

const setInitialParams = (rowIndex, item) => {
  const params = getParams(rowIndex);
  const textElement = document.getElementById(item.textId);
  const parentElement = textElement.parentNode;
  const borderTopWidth = parseInt(parentElement.style.borderTopWidth) || 0;
  const borderRightWidth = parseInt(parentElement.style.borderRightWidth) || 0;
  const borderBottomWidth =
    parseInt(parentElement.style.borderBottomWidth) || 0;
  const borderLeftWidth = parseInt(parentElement.style.borderLeftWidth) || 0;
  const borderXWidth = borderLeftWidth + borderRightWidth;
  const borderYWidth = borderTopWidth + borderBottomWidth;
  textElement.style.fontSize = params.fontSize + "px";
  const textWidth = textElement.clientWidth;
  const textHeight = textElement.clientHeight;
  return {
    ...params,
    textWidth,
    textHeight,
    borderTopWidth,
    borderRightWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderXWidth,
    borderYWidth,
  };
};

const setWidthAndHeight = (params) => ({
  ...params,
  width: params.px * 2 + params.mx * 2 + params.textWidth + params.borderXWidth,
  height:
    params.py * 2 + params.my * 2 + params.textHeight + params.borderYWidth,
});

const setSizeParams = flow([setInitialParams, setWidthAndHeight]);

export default setSizeParams;
