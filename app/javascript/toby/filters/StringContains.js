import React, { useState } from "react";

export default function StringContains({ filter, onChange }) {
  const [value, setValue] = useState(filter.value[0] || "");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    onChange([value]);
  };

  return (
    <input
      value={value}
      onBlur={handleBlur}
      onChange={handleChange}
      type="text"
    />
  );
}
