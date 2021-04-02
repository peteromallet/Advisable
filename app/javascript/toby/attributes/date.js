import React from "react";
import { DateTime } from "luxon";

export default {
  render: function RenderDate({ record, field }) {
    const value = record[field.name];
    return value ? DateTime.fromISO(value).toLocaleString() : null;
  },
};
