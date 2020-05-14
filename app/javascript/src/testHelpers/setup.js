import "jest-axe/extend-expect";
import "@testing-library/jest-dom/extend-expect";

import { configure } from "@testing-library/dom";

configure({
  asyncUtilTimeout: 10000,
});
