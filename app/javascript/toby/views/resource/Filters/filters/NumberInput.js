import React from "react";
import { Input } from "@advisable/donut";
import CurrencyInput from "./CurrencyInput";

export default function NumberInput({ attribute, value, onChange }) {
  if (attribute.__typename === "CurrencyAttribute") {
    return <CurrencyInput value={value} onChange={onChange} />;
  }

  const handleChange = (e) => {
    onChange([e.target.value]);
  };

  return <Input value={value[0]} onChange={handleChange} type="number" />;
}
