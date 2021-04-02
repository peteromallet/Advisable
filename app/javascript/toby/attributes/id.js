import React from "react";
import { Tag } from "@advisable/donut";

export default {
  render: function RenderID({ record }) {
    return record.id;
  },
  input: function RenderIDInput({ record, attribute }) {
    return record[attribute.name];
  },
};
