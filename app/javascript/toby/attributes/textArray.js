import React from "react";
import { useField } from "formik";
import BulletPointInput from "src/components/BulletPointInput";

export default {
  render: function RenderStringColumn({ record, attribute }) {
    return record[attribute.name].join(", ");
  },
  input: function TextArrayInput({ attribute }) {
    const [field, , helpers] = useField(attribute.name);

    return (
      <BulletPointInput
        value={field.value || []}
        onChange={(value) => helpers.setValue(value)}
      />
    );
  },
};
