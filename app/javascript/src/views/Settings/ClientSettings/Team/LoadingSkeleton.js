import React from "react";
import { Box, Skeleton } from "@advisable/donut";

function SkeletonTeamMember() {
  return (
    <>
      <Box
        height="60px"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Skeleton height="12px" width="100px" mb={1} />
          <Skeleton height="8px" width="200px" />
        </Box>
        <Skeleton height="10px" width="70px" />
      </Box>
      <Box height="1px" bg="neutral100" />
    </>
  );
}

export default function LoadingSkeleton() {
  return (
    <>
      <SkeletonTeamMember />
      <SkeletonTeamMember />
      <SkeletonTeamMember />
    </>
  );
}
