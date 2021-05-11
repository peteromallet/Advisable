import React from "react";

export default {
  render: function RenderHasOne({ record, field }) {
    const value = record[field.name];
    if (!value) return null;
    return value?._label;
  },
};
