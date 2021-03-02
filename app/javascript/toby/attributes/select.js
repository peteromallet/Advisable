import React from "react";
import { Tag } from "@advisable/donut";

export default {
  render: function RenderStringColumn({ record, field }) {
    return <Tag size="s">{record[field.name]}</Tag>;
  },
};
