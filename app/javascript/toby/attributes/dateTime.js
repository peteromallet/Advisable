import React from "react";
import { DateTime } from "luxon";

export default {
  render: function RenderDateTime({ record, field }) {
    const value = record[field.name];
    return value
      ? DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_SHORT)
      : null;
  },
  input: function DateTimeInput() {
    return <>div</>;
  },
};
