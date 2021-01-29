import React from "react";
import { Box, Tag } from "@advisable/donut";

export default function ComboboxTags({ value, removeOption }) {
  return (
    <Box paddingTop={2}>
      {value.map((v) => (
        <Tag
          size="s"
          key={v.value}
          marginRight={2}
          marginBottom={2}
          onRemove={() => removeOption(v.value)}
        >
          {v.label}
        </Tag>
      ))}
    </Box>
  );
}
