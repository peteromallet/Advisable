import React from "react";

export default {
  render: function Integer({ record, field }) {
    const value = record[field.name];
    return value;
  },
  input: function IntegerInput() {
    return <>div</>;
  },
};
