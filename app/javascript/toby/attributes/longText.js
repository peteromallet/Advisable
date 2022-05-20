import React from "react";
import { useField } from "formik";
import { Textarea } from "@advisable/donut";

export default {
  render: function RenderLongText({ record, attribute }) {
    return <p className="font-inter">{record[attribute.name] || null}</p>;
  },
  initializeFormValue: function (record, attribute) {
    return record[attribute.name] || "";
  },
  copy: function (attribute, record) {
    return record[attribute.name] || "";
  },
  input: function LongTextInput({ attribute }) {
    const [field, meta] = useField(attribute.name);
    const error = meta.touched && meta.error;

    return <Textarea minRows={3} size="sm" error={error} {...field} />;
  },
};
