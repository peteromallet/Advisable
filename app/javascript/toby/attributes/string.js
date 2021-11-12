import React from "react";
import { useField } from "formik";
import { Input } from "@advisable/donut";

export default {
  render: function RenderStringColumn({ record, attribute }) {
    return record[attribute.name] || null;
  },
  initializeFormValue: function (record, attribute) {
    return record[attribute.name] || "";
  },
  copy: function (attribute, record) {
    return record[attribute.name] || "";
  },
  input: function StringAttributeInput({ attribute, record }) {
    const [field, meta] = useField(attribute.name);
    if (attribute.readonly) return record[attribute.name];

    const error = meta.touched && meta.error;

    return <Input size="sm" error={error} {...field} />;
  },
};
