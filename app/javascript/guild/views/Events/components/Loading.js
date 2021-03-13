import React from "react";
import { Box, Card, Skeleton, Stack } from "@advisable/donut";

function SkeletonEvent() {
  return (
    <Card flex="auto" minHeight="380px" borderRadius="12px">
      <Skeleton width="100%" height="160px" borderRadius="12px 12px 0 0" />
      <Box display="flex" flexDirection="column" padding="5">
        <Box display="flex" height="32px">
          <Skeleton borderRadius="8px" width="100px" />
        </Box>
        <Stack mt="3" spacing="s">
          <Skeleton width="100%" height="26px" />
          <Skeleton width="90%" height="26px" />
          <Box width="100%" display="flex" alignItems="center">
            <Skeleton borderRadius="50%" height="50px" width="50px" />
            <Box ml="3" display="flex" flexDirection="column">
              <Skeleton width="120px" height="18px" />
              <Skeleton mt="2" width="160px" height="18px" />
            </Box>
          </Box>
        </Stack>
      </Box>
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
      gridGap="40px"
      display="grid"
      gridTemplateColumns={{ _: "1fr", s: "1fr 1fr", l: "1fr 1fr 1fr" }}
    >
      {events}
    </Box>
  );
}
