import React from "react";

export default function StringContains({ onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  return <input onChange={handleChange} type="text" />;
}
