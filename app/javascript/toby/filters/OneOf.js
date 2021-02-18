import React, { useState } from "react";

export default function OneOf({ onChange }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    onChange(e.target.value.split(",").map((v) => v.trim()));
  };

  return <input value={value} onChange={handleChange} type="text" />;
}
