import React, { useState } from "react";
import { Select } from "@advisable/donut";

function EqualsSelect({ filter, attribute, onChange }) {
  return (
    <Select
      size="xs"
      value={filter.value?.[0]}
      placeholder="Select"
      onChange={(e) => onChange([e.target.value])}
    >
      {attribute.options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </Select>
  );
}

export default function Equals({ filter, attribute, onChange }) {
  const [value, setValue] = useState(filter.value[0] || "");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = () => {
    onChange([value]);
  };

  if (attribute.options?.length > 0) {
    return (
      <EqualsSelect filter={filter} attribute={attribute} onChange={onChange} />
    );
  }

  return (
    <input
      value={value}
      onBlur={handleBlur}
      onChange={handleChange}
      type="text"
    />
  );
}
