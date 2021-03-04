import React, { useState } from "react";
import { useSchema } from "../components/schema";
import { getType } from "../utilities";

export default function OneOf({ resource, filter, onChange }) {
  const schemaData = useSchema();
  const resourceType = getType(schemaData.schema, resource.type);
  const field = resourceType.fields.find((f) => f.name === filter.attribute);
  const isScalar = field.type.kind === "SCALAR";
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = (e) => {
    const values = e.target.value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    onChange(values);
  };

  if (isScalar) {
    return (
      <input
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
        type="text"
      />
    );
  }

  return null;
}
