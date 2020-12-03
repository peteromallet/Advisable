import React from "react";
import { Box, Card, Stack, Skeleton } from "@advisable/donut";

function SkeletonPost() {
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

export default function LoadingPosts({ skeletonPosts = 3 }) {
  const posts = [...Array(skeletonPosts)].map((_, i) => (
    <SkeletonPost key={i} />
  ));

  return <Stack spacing="4">{posts}</Stack>;
}
