import React, { useRef, useState } from "react";
import { StyledTextarea, StyledTextareaControl } from "./styles";

<<<<<<< HEAD
const LINE_HEIGHT = 18;
=======
const LINE_HEIGHT = 22;
>>>>>>> Add new input components
const PADDING = 32;

const Textarea = React.forwardRef(function Textarea(
  {
    size,
    error,
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginX,
    marginY,
    ...props
  },
  ref,
) {
  const textarea = useRef(ref);
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
    props.onFocus(e);
  };

  const handleBlur = (e) => {
    setFocused(false);
    props.onBlur(e);
  };

  function calculateRows() {
    textarea.current.rows = props.minRows;
    const baseHeight =
<<<<<<< HEAD
      textarea.current.scrollHeight - (props.rowPadding || PADDING);
=======
      textarea.current.scrollHeight - (props.padding || PADDING);
>>>>>>> Add new input components
    const currentRows = Math.floor(
      baseHeight / (props.lineHeight || LINE_HEIGHT),
    );
    const rows = currentRows >= props.maxRows ? props.maxRows : currentRows;
    textarea.current.rows = rows;
  }

  React.useLayoutEffect(calculateRows, [props.value]);

  return (
    <StyledTextarea
      $focused={focused}
      $error={error}
      $disabled={props.disabled}
      size={size}
      margin={margin}
      marginX={marginX}
      marginY={marginY}
      marginTop={marginTop}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
    >
      <StyledTextareaControl
        {...props}
        as="textarea"
        ref={textarea}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
    </StyledTextarea>
  );
});

Textarea.defaultProps = {
  minRows: 2,
  maxrows: 5,
<<<<<<< HEAD
  size: "md",
=======
>>>>>>> Add new input components
  onFocus: () => {},
  onBlur: () => {},
};

export default Textarea;
