import React from "react";
import { useField } from "formik";
import { Tag, Select } from "@advisable/donut";

export default {
  render: function RenderStringColumn({ record, attribute }) {
    return <Tag size="s">{record[attribute.name]}</Tag>;
  },
  initializeFormValue: function (record, attribute) {
    return record[attribute.name] || "";
  },
  copy: function (attribute, record) {
    return record[attribute.name] || "";
  },
  input: function StringAttributeInput({ attribute, record }) {
    const [field] = useField(attribute.name);
    if (attribute.readonly) return record[attribute.name];
    return (
      <Select size="sm" {...field} placeholder={attribute.columnLabel}>
        {attribute.options.map((opt) => (
          <option key={opt}>{opt}</option>
        ))}
      </Select>
    );
  },
};
