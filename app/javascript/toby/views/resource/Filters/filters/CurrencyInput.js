import React from "react";
import { Input } from "@advisable/donut";

function CurrencyInput({ value, onChange }) {
  const price = value[0] ? Number(value[0] / 100.0) : "";

  const handleChange = (e) => {
    const nextValue = e.target.value;
    const stripped = nextValue.replace(/[^0-9.-]+/g, "");
    const val = stripped ? Number(stripped) * 100 : undefined;
    onChange([val.toString()]);
  };

  return <Input prefix="$" value={price} onChange={handleChange} />;
}

export default CurrencyInput;
