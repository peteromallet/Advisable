import React from "react";
import { Input } from "@advisable/donut";

export default function StringContains({ value, onChange }) {
  const handleChange = (e) => {
    onChange([e.target.value]);
  };
  return <Input value={value} onChange={handleChange} type="text" />;
}
