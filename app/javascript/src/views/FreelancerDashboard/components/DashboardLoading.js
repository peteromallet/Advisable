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
    </>
  );
}
