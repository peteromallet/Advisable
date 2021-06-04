import flow from "lodash/flow";
import calcLayout from "./calcLayout";
import setSectionKeys from "./setSectionKeys";
import setLayoutParam from "./setLayoutParam";
import initSectionsWidth from "./initSectionsWidth";
import setSectionsRatio from "./setSectionsRatio";

const setLayout = flow([
  setSectionsRatio,
  setSectionKeys,
  initSectionsWidth,
  calcLayout,
  setLayoutParam,
]);

export default setLayout;
