import React from "react";

export default function StringContains({ filter, onChange }) {
  const handleChange = (e) => {
    onChange([e.target.value]);
  };
  return <input value={filter.value[0]} onChange={handleChange} type="text" />;
}
