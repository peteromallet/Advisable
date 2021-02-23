import React from "react";

export default {
  render: function RenderStringColumn({ record, field }) {
    return record[field.name].join(", ");
  },
  input: function StringColumnInput() {
    return <input />;
  },
};
