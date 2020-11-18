import React from "react";
import { Stack, Skeleton } from "@advisable/donut";

export default function LoadingGuildProfile() {
  return (
    <Stack spacing="lg">
      <Skeleton height="200px" borderRadius="12px" />
      <Skeleton height="200px" borderRadius="12px" />
      <Skeleton height="200px" borderRadius="12px" />
      <Skeleton height="200px" borderRadius="12px" />
    </Stack>
  );
}
