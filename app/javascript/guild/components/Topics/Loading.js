import React from "react";
import { Stack, Skeleton } from "@advisable/donut";

export default function LoadingTopics() {
  return (
    <Stack spacing="5">
      <Skeleton height="15px" width="100px" />
      <Skeleton height="15px" width="140px" />
      <Skeleton height="15px" width="120px" />
      <Skeleton height="15px" width="130px" />
      <Skeleton height="15px" width="145px" />
      <Skeleton height="15px" width="128px" />
      <Skeleton height="15px" width="112px" />
      <Skeleton height="15px" width="129px" />
    </Stack>
  );
}
