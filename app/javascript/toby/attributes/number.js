import React from "react";

export default {
  render: function Integer({ record, attribute }) {
    const value = record[attribute.name];
    return value;
  },
};
