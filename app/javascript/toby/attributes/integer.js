import React from "react";
import { useField } from "formik";
import { Input } from "@advisable/donut";

export default {
  render: function Integer({ record, field }) {
    const value = record[field.name];
    return value;
  },
  initializeFormValue: function (record, attribute) {
    return record[attribute.name] || undefined;
  },
  input: function IntegerAttributeInput({ attribute, record }) {
    const [field] = useField(attribute.name);

    return <Input type="number" {...field} />;
  },
};
