import React from "react";
import { Description } from "./styles";

export default function TaskDrawerDescription(props) {
  const handleChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <Description
      type="text"
      name="description"
      {...props}
      value={props.value}
      onChange={handleChange}
      placeholder={props.readOnly ? "No Description" : "Add a description..."}
    />
  );
}
