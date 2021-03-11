import React from "react";
import { Select, Input, Button } from "@advisable/donut";

function EqualsSelect({ value, attribute, onChange, finalize }) {
  return (
    <>
      <Select
        size="xs"
        value={value?.[0]}
        onChange={(e) => onChange([e.target.value])}
      >
        {attribute.options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </Select>
      <button onClick={finalize}>Apply</button>
    </>
  );
}

function EqualsInput({ value, onChange, finalize }) {
  const handleChange = (e) => {
    onChange([e.target.value]);
  };
  return (
    <>
      <Input
        autoFocus
        value={value}
        onChange={handleChange}
        type="text"
        marginBottom={4}
      />
      <Button size="s" onClick={finalize}>
        Apply
      </Button>
    </>
  );
}

export default function Equals({ attribute, ...props }) {
  if (attribute.options?.length > 0) {
    return <EqualsSelect attribute={attribute} {...props} />;
  }

  return <EqualsInput attribute={attribute} {...props} />;
}
