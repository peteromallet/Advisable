import React from "react";
import { Skeleton, Box } from "@advisable/donut";

function LoadingFeaturedMembers() {
  return (
    <Box display="grid" gridRowGap="6" gridTemplateColumns="1fr 1fr 1fr">
      <Box
        width="70px"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Skeleton width="60px" height="60px" borderRadius="50%" mb="3" />
        <Skeleton width="50px" height="12px" />
      </Box>
      <Box
        width="70px"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Skeleton width="60px" height="60px" borderRadius="50%" mb="3" />
        <Skeleton width="50px" height="12px" />
      </Box>
      <Box
        width="70px"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Skeleton width="60px" height="60px" borderRadius="50%" mb="3" />
        <Skeleton width="50px" height="12px" />
      </Box>
      <Box
        width="70px"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Skeleton width="60px" height="60px" borderRadius="50%" mb="3" />
        <Skeleton width="50px" height="12px" />
      </Box>
      <Box
        width="70px"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Skeleton width="60px" height="60px" borderRadius="50%" mb="3" />
        <Skeleton width="50px" height="12px" />
      </Box>
      <Box
        width="70px"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <Skeleton width="60px" height="60px" borderRadius="50%" mb="3" />
        <Skeleton width="50px" height="12px" />
      </Box>
    </Box>
  );
}

export default LoadingFeaturedMembers;
