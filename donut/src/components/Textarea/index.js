import React from "react";
import { StyledTextarea } from "./styles";

const LINE_HEIGHT = 18;
const PADDING = 24;

const Textarea = React.forwardRef((props, ref) => {
  const textarea = ref || React.useRef(null);

  function calculateRows() {
    textarea.current.rows = props.minRows;
    const baseHeight = textarea.current.scrollHeight - PADDING;
    const currentRows = Math.floor(baseHeight / LINE_HEIGHT);
    const rows = currentRows >= props.maxRows ? props.maxRows : currentRows;
    textarea.current.rows = rows;
  }

  React.useLayoutEffect(calculateRows, [props.value]);

  return <StyledTextarea as="textarea" ref={textarea} {...props} />;
});

Textarea.defaultProps = {
  minRows: 2,
  maxrows: 5,
};

export default Textarea;
