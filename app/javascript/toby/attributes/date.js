import React from "react";
import { DateTime } from "luxon";
import { useField } from "formik";
import DatePicker from "src/components/DatePicker";

function DateAttribute({ record, field }) {
  const value = record[field.name];
  return value ? DateTime.fromISO(value).toLocaleString() : null;
}

function DateInput({ attribute }) {
  const [field, meta, { setValue }] = useField(attribute.name);

  const error = meta.touched && meta.error;

  const handleChange = (date) => {
    setValue(date);
  };

  return (
    <DatePicker.Input
      size="sm"
      clearable
      error={error}
      label="Select date"
      value={field.value}
      onChange={handleChange}
    />
  );
}

export default {
  render: DateAttribute,
  input: DateInput,
  initializeFormValue(record, attribute) {
    return record[attribute.name] || null;
  },
};
