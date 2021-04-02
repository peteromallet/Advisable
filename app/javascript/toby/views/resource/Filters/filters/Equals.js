import React from "react";
import { Select, Input } from "@advisable/donut";
import CurrencyInput from "./CurrencyInput";

function EqualsSelect({ value, attribute, onChange }) {
  return (
    <Select
      size="xs"
      value={value?.[0]}
      placeholder="Select"
      onChange={(e) => onChange([e.target.value])}
    >
      {attribute.options.map((opt) => (
        <option key={opt}>{opt}</option>
      ))}
    </Select>
  );
}

function EqualsInput({ value, onChange }) {
  const handleChange = (e) => {
    onChange([e.target.value]);
  };
  return <Input value={value} onChange={handleChange} type="text" />;
}

export default function Equals({ attribute, ...props }) {
  if (attribute.__typename === "CurrencyAttribute") {
    return <CurrencyInput {...props} />;
  }

  if (attribute.options?.length > 0) {
    return <EqualsSelect attribute={attribute} {...props} />;
  }

  return <EqualsInput attribute={attribute} {...props} />;
}
