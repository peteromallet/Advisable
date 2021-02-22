import React from "react";
import { Box, Card, Skeleton } from "@advisable/donut";

function SkeletonEvent() {
  return (
    <Card padding="8" borderRadius="12px">
      <Box display="flex" alignItems="center" mb="6">
        <Skeleton width="40px" height="40px" borderRadius="50%" mr="3" />
        <Box>
          <Skeleton mb="1" height="16px" width="170px" />
          <Skeleton height="13px" width="120px" />
        </Box>
      </Box>

      <Skeleton width="100%" height="24px" mb="2" />
      <Skeleton width="60%" height="24px" mb="8" />

      <Skeleton width="100%" height="15px" mb="2" />
      <Skeleton width="100%" height="15px" mb="2" />
      <Skeleton width="80%" height="15px" mb="2" />
    </Card>
  );
}

export default function Loading({ skeletonEvents = 6 }) {
  const events = [...Array(skeletonEvents)].map((_, i) => (
    <SkeletonEvent key={i} />
  ));

  return (
    <Box
      width="100%"
      gridGap="20px"
      display="grid"
      gridTemplateColumns={{ _: "1fr", s: "1fr 1fr", l: "1fr 1fr 1fr" }}
    >
      {events}
    </Box>
  );
}
