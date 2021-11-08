import React from "react";
import { Skeleton, Box, Stack } from "@advisable/donut";

export default function DashboardLoading() {
  return (
    <>
      <Stack as={Box} spacing={16} mb={16} gridColumn="2" gridRow="1">
        <Box>
          <Skeleton width="40%" height="28px" mt={1} mb={7} />
          <Stack spacing={12} divider="neutral100">
            <Skeleton width="100" height="92px" borderRadius="12px" />
            <Skeleton width="100" height="92px" borderRadius="12px" />
            <Skeleton width="100" height="92px" borderRadius="12px" />
          </Stack>
        </Box>
        <Box>
          <Skeleton width="40%" height="28px" mt={1} mb={7} />
          <Stack spacing={12} divider="neutral100">
            <Skeleton width="100" height="92px" borderRadius="12px" />
            <Skeleton width="100" height="92px" borderRadius="12px" />
            <Skeleton width="100" height="92px" borderRadius="12px" />
          </Stack>
        </Box>
      </Stack>
      <Box gridColumn="1" gridRow="1">
        <Box display="flex" width="100%" alignItems="center" mb={6}>
          <Skeleton width="40%" height="28px" my={1} />
          <Box ml="auto">
            <Skeleton width="100px" height="36px" borderRadius="18px" />
          </Box>
        </Box>
        <Stack spacing={4}>
          <Skeleton width="100%" height="200px" borderRadius="20px" />
          <Skeleton width="100%" height="220px" borderRadius="20px" />
          <Skeleton width="100%" height="200px" borderRadius="20px" />
          <Skeleton width="100%" height="200px" borderRadius="20px" />
        </Stack>
      </Box>
    </>
  );
}
