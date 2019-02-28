import * as React from "react";
import { max } from "moment";

const LineClamp = ({ children, maxHeight, character = "…" }) => {
  return <span>{children}</span>;
};

export default LineClamp;
