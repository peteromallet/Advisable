import { flow } from "lodash-es";
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
        my: 3,
        mx: 3,
      };
    case 1:
      return {
        fontSize: isMobile ? 12 : 15,
        py: isMobile ? 10 : 16,
        px: isMobile ? 5 : 16,
        my: 3,
        mx: 3,
      };
    default:
      return {
        fontSize: isMobile ? 12 : 14,
        py: 10,
        px: 5,
        my: 3,
        mx: 3,
      };
  }
};

const setInitialParams = (rowIndex, item) => {
  const params = getParams(rowIndex);
  const textElement = document.getElementById(item.textId);
  textElement.style.fontSize = params.fontSize + "px";
  const textWidth = textElement.clientWidth;
  const textHeight = textElement.clientHeight;
  return { ...params, textWidth, textHeight };
};

const setWidthAndHeight = (params) => ({
  ...params,
  width: params.px * 2 + params.mx * 2 + params.textWidth,
  height: params.py * 2 + params.my * 2 + params.textHeight,
});

const setSizeParams = flow([setInitialParams, setWidthAndHeight]);

export default setSizeParams;
