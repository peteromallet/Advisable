import React from "react";
import { Box, Skeleton } from "@advisable/donut";

const ResultsLoading = () => {
  return (
    <>
      <Skeleton width={60} height={12} mb="xs" />
      <Skeleton maxWidth={500} height={24} mb="xs" />
      <Skeleton maxWidth={600} height={18} mb="l" />
      <Box display="flex" flexWrap="wrap" ml="-10px" mr="-10px">
        <Box width="33.3333%">
          <Skeleton height={470} mx={10} mb={10} />
        </Box>
        <Box width="33.3333%">
          <Skeleton height={470} mx={10} mb={10} />
        </Box>
        <Box width="33.3333%">
          <Skeleton height={470} mx={10} mb={10} />
        </Box>
      </Box>
    </>
  );
};

export default ResultsLoading;
