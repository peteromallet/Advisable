import React from "react";
import { Box, Skeleton } from "@advisable/donut";

const Loading = () => (
  <Box flexWrap="wrap" display="flex" ml="-10px" mr="-10px">
    <Box width={[1, 1 / 2, 1 / 3]} px={10} pb="m">
      <Skeleton height={280} />
    </Box>
    <Box width={[1, 1 / 2, 1 / 3]} px={10} pb="m">
      <Skeleton height={280} />
    </Box>
    <Box width={[1, 1 / 2, 1 / 3]} px={10} pb="m">
      <Skeleton height={280} />
    </Box>
  </Box>
);

export default Loading;
