import React from "react";

export default {
  render: function RenderHasMany({ record, field }) {
    return record[field.name].id;
  },
  input: function BelongsToInput() {
    return <>div</>;
  },
};
