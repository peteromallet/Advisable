import React from "react";
import { Box, Tag } from "@advisable/donut";

export default function ComboboxTags({ value, removeOption }) {
  return (
    <Box paddingTop={2}>
      {value.map((v) => (
        <Tag
          size="s"
          key={v.value}
          marginRight="2xs"
          marginBottom="2xs"
          onRemove={() => removeOption(v.value)}
        >
          {v.label}
        </Tag>
      ))}
    </Box>
  );
}
