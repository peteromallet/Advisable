import React from "react";
import { useField } from "formik";
import { Checkbox } from "@advisable/donut";

export default {
  render: function Boolean({ record, field }) {
    return record[field.name] ? "✅" : "❌";
  },
  initializeFormValue: function (record, attribute) {
    return record[attribute.name] || false;
  },
  input: function BooleanAttributeInput({ attribute, record }) {
    const [field] = useField(attribute.name);

    return (
      <Checkbox {...field} checked={field.value}>
        {attribute.columnLabel}
      </Checkbox>
    );
  },
};
