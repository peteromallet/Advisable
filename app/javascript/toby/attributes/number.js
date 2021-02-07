import React from "react";

export default {
  render: function RenderNumber({ record, column }) {
    return record[column.field];
  },
  input: function StringColumnInput({ record, column }) {
    return <>div</>;
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
