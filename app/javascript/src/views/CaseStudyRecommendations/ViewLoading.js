import React from "react";
import { Box, Skeleton } from "@advisable/donut";
import CardsSkeleton from "./CardsSkeleton";

export default function ViewLoading() {
  return (
    <>
      <Box>
        <Skeleton height="24px" width="30%" />
        <Box marginY={10} height="1px" bg="neutral200" />
        <CardsSkeleton />
      </Box>
    </>
  );
}
