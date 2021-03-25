import React from "react";
import { useField } from "formik";
import { Input } from "@advisable/donut";

export default {
  render: function RenderStringColumn({ record, field }) {
    return record[field.name] || null;
  },
  initializeFormValue: function (record, attribute) {
    return record[attribute.name] || "";
  },
  input: function StringAttributeInput({ attribute, record }) {
    const [field] = useField(attribute.name);
    if (attribute.readonly) return record[attribute.name];
    return <Input size="sm" {...field} />;
  },
};
