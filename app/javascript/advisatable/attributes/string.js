import React from "react";
import { useField } from "formik";

export default {
  render: function RenderStringColumn({ record, column }) {
    return record[column.field] || null;
  },
  input: function StringColumnInput({ record, column }) {
    const [field, meta, helpers] = useField(column.field);
    return <input {...field} />;
  },
};

// const stringAttribute = {
//   columnType: "StringColumnType",
//   query: (resource) => {
//     return attribute;
//   },
//   inputValue: (resource, attribute) => {
//     return resource[attribute.name];
//   },
//   render: function ReadStringAttribute(resource, attribute) {
//     return resource[attribute.name];
//   },
//   renderInput: function WriteSingleSelect(resource, attribute, formikField) {
// return <input {...formikField.field} />;
//   },
// };

// export default stringAttribute;
