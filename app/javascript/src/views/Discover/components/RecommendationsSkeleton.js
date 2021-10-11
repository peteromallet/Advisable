import React from "react";
import SuperEllipse from "react-superellipse";
import { Stack, Box, Skeleton } from "@advisable/donut";

function RecommendationSkeleton() {
  return (
    <Box display="flex" alignItems="center">
      <Box flexShrink={0}>
        <Skeleton
          as={SuperEllipse}
          r1={0.02}
          r2={0.4}
          width="180px"
          height="220px"
        />
      </Box>
      <Box paddingLeft={8} width="100%">
        <Skeleton height="28px" marginBottom={2} />
        <Skeleton height="28px" width="40%" marginBottom={6} />
        <Skeleton height="16px" marginBottom={2} />
        <Skeleton height="16px" width="30%" />
      </Box>
    </Box>
  );
}

export default function RecommendationsSkeleton() {
  return (
    <Stack spacing={20} divider="neutral100">
      <RecommendationSkeleton key="1" />
      <RecommendationSkeleton key="2" />
      <RecommendationSkeleton key="3" />
    </Stack>
  );
}
