// Takes a props object and returns a new object with only the stlyed system spacing props
import pick from "lodash/pick";

const PROPS = [
  "margin",
  "m",
  "marginTop",
  "mt",
  "marginRight",
  "mr",
  "marginBottom",
  "mb",
  "marginLeft",
  "ml",
  "marginX",
  "mx",
  "marginY",
  "my",
  "padding",
  "p",
  "paddingTop",
  "pt",
  "paddingRight",
  "pr",
  "paddingBottom",
  "pb",
  "paddingLeft",
  "pl",
  "paddingX",
  "px",
  "paddingY",
  "y",
];

const extractSpacingProps = props => {
  return pick(props, PROPS);
};

export default extractSpacingProps;
