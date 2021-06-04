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
  "py",
];

const extractSpacingProps = (props) => {
  return pick(props, PROPS);
};

export default extractSpacingProps;
