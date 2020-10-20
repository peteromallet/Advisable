import { flow } from "lodash-es";
import calcLayout from "./calcLayout";
import setSectionKeys from "./setSectionKeys";
import setLayoutParam from "./setLayoutParam";
import initSectionsWidth from "./initSectionsWidth";

const setLayout = flow([
  setSectionKeys,
  initSectionsWidth,
  calcLayout,
  setLayoutParam,
]);

export default setLayout;
