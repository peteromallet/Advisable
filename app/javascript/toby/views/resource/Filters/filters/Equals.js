import React from "react";
import { Select } from "@advisable/donut";
import CurrencyInput from "./CurrencyInput";
import StringContains from "./StringContains";

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

export default function Equals({ attribute, ...props }) {
  if (attribute.__typename === "CurrencyAttribute") {
    return <CurrencyInput {...props} />;
  }

  if (attribute.options?.length > 0) {
    return <EqualsSelect attribute={attribute} {...props} />;
  }

  return <StringContains attribute={attribute} {...props} />;
}
