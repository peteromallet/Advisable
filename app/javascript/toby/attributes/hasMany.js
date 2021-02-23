import React from "react";
import { Tag } from "@advisable/donut";

export default {
  render: function RenderHasMany({ record, field }) {
    return (
      <>
        {record[field.name].map((r) => (
          <Tag key={r.id} mr={2}>
            {r.id}
          </Tag>
        ))}
      </>
    );
  },
  input: function BelongsToInput() {
    return <>div</>;
  },
};
