import * as React from "react";
import { Label, Description } from "./styles";

export default (props) => {
  const ref = React.useRef(null);
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

  React.useLayoutEffect(calculateRows, [ref, props.value]);

  React.useLayoutEffect(() => {
    if (props.isFocused) {
      ref.current.focus();
    }
  }, [props.isFocused])

  const handleChange = e => {
    props.onChange(e.target.value);
  };

  return (
    <>
      <Label>Description</Label>
      <Description
        type="text"
        {...props}
        ref={ref}
        rows={rows}
        value={props.value}
        onChange={handleChange}
        placeholder="Add a description..."
      />
    </>
  );
};
