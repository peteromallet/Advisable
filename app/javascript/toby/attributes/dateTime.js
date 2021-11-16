import React from "react";
import { DateTime } from "luxon";

export default {
  render: function RenderDateTime({ record, attribute }) {
    const value = record[attribute.name];
    return value
      ? DateTime.fromISO(value).toLocaleString(DateTime.DATETIME_SHORT)
      : null;
  },
};
