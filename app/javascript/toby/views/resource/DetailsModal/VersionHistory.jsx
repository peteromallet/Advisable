import React from "react";
import { Stack } from "@advisable/donut";
import Version from "./Version";

export default function VersionHistory({ resource }) {
  return (
    <Stack spacing="sm">
      {resource._history.map((version, index) => (
        <Version
          key={version.number}
          version={version}
          initialOpen={index === resource._history.length - 1}
        />
      ))}
    </Stack>
  );
}
