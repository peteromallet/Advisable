import React from "react";
import { useField } from "formik";
import TagsInput from "../components/TagsInput";

export default {
  render: function RenderHasMany({ record, field }) {
    const items = record[field.name].map((r) => {
      return r._label;
    });

    return items.map((item, i) => {
      return [i > 0 && ", ", item];
    });
  },
  initializeFormValue: function (record, attribute) {
    return record[attribute.name].map((n) => n.id) || [];
  },
  input: function HasManyInput({ attribute }) {
    const [field, , helpers] = useField(attribute.name);

    return (
      <TagsInput
        value={field.value}
        onChange={(value) => helpers.setValue(value)}
      />
    );
  },
};
