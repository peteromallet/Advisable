import React from "react";
import { Stack, Box, Skeleton } from "@advisable/donut";

function CardSkeleton() {
  return (
    <Box display="flex">
      <Skeleton width={132} height={168} borderRadius="12px" />
      <Box paddingLeft={6} flex={1}>
        <Skeleton height={16} mb={2} />
        <Skeleton width="40%" height={16} mb={4} />
        <Skeleton width="15%" height={10} mb={6} />
        <Skeleton height={10} mb={2} />
        <Skeleton height={10} mb={2} />
        <Skeleton width="60%" height={10} mb={2} />
      </Box>
    </Box>
  );
}

export default function CardsSkeleton() {
  return (
    <Stack spacing={16} divider="neutral100">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </Stack>
  );
}
