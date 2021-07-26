import React from "react";
import { Box, Skeleton } from "@advisable/donut";
import CardsSkeleton from "./CardsSkeleton";

export default function ViewLoading() {
  return (
    <>
      <Box>
        <Skeleton height="24px" width="40%" mb={5} />
        <Skeleton height="12px" width="100%" mb={3} />
        <Skeleton height="12px" width="60%" />
        <Box marginY={10} height="1px" bg="neutral200" />
        <CardsSkeleton />
      </Box>
    </>
  );
}
