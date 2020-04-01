import React from "react";
import { Box, Skeleton } from "@advisable/donut";

function ProjectDetailsLoading() {
  return (
    <Box>
      <Skeleton height={24} width={120} borderRadius={12} mb="s" />
      <Skeleton height={28} width={500} mb="l" />
      <Skeleton height={1} mb="m" />
      <Box display="flex" alignItems="center" mb="m">
        <Skeleton width={40} height={40} borderRadius="50%" mr="s" />
        <Box>
          <Skeleton height={12} width={130} mb="xs" />
          <Skeleton height={10} width={180} />
        </Box>
      </Box>
      <Skeleton height={1} mb="l" />
      <Skeleton height={16} width={100} mb="xs" />
      <Skeleton height={14} mb="xs" />
      <Skeleton height={14} mb="xs" />
      <Skeleton height={14} mb="xs" />
      <Skeleton height={14} width={200} mb="xl" />
    </Box>
  );
}

export default ProjectDetailsLoading;
