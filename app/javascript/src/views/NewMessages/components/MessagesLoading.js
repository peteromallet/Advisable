import React from "react";
import { Stack, Box, Skeleton } from "@advisable/donut";

function MessageSkeleton() {
  return (
    <Box display="flex" width="100%">
      <Box flexShrink="0" pr={3}>
        <Skeleton height="40px" width="40px" borderRadius="20px" />
      </Box>
      <Box width="100%">
        <Box
          width="100%"
          display="flex"
          marginBottom={3}
          alignItems="flex-end"
          justifyContent="space-between"
        >
          <Skeleton width="25%" height="16px" />
          <Skeleton width="40px" height="12px" />
        </Box>
        <Skeleton height="12px" marginBottom={2} />
        <Skeleton height="12px" marginBottom={2} />
        <Skeleton width="60%" height="12px" />
      </Box>
    </Box>
  );
}

export default function MessagesLoading() {
  return (
    <Stack paddingY={10} spacing="4xl" divider="neutral200">
      <MessageSkeleton />
      <MessageSkeleton />
      <MessageSkeleton />
    </Stack>
  );
}
