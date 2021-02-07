import React from "react";
import { Tag } from "@advisable/donut";

export default {
  render: function RenderStringColumn({ record, column }) {
    return <Tag marginLeft="-12px">{record[column.field]}</Tag>;
  },
  input: function StringColumnInput({ record, column }) {
    return <>input</>;
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
