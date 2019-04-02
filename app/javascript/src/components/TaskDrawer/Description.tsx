import * as React from "react";
import { Label, Description } from "./styles";

export default ({ task, ...props }) => {
  const ref = React.useRef(null);
  const [inputValue, setInputValue] = React.useState(task.description);
  const [rows, setRows] = React.useState(1);

  const LINE_HEIGHT = 20;
  const calculateRows = () => {
    const el = ref.current;
    const previousRows = el.rows;
    el.rows = 1;

    let currentRows = Math.floor(el.scrollHeight / LINE_HEIGHT);

    if (currentRows === previousRows) {
      el.rows = currentRows;
    }

    setRows(currentRows);
  };

  React.useLayoutEffect(calculateRows, [ref]);

  React.useLayoutEffect(() => {
    if (props.isFocused) {
      ref.current.focus();
    }
  }, [props.isFocused])

  const handleChange = e => {
    calculateRows();
    setInputValue(e.target.value);
  };

  return (
    <>
      <Label>Description</Label>
      <Description
        type="text"
        {...props}
        ref={ref}
        rows={rows}
        value={inputValue}
        onChange={handleChange}
        placeholder="Add a description..."
      />
    </>
  );
};
