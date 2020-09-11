import React from "react";
import { Box, Skeleton, useBreakpoint } from "@advisable/donut";
import Masonry from "components/Masonry";

function SkeletonTag({ width }) {
  return (
    <Skeleton
      display="inline-block"
      borderRadius={12}
      width={width}
      height={24}
      mb="xxs"
      mr="xxs"
    />
  );
}

function DesktopLoading() {
  const isLargeScreen = useBreakpoint("lUp");

  return (
    <Box maxWidth={1250} px="m" mx="auto" py="l" display="flex">
      <Box width={320} flexShrink={0}>
        <Skeleton height={360} mb="xl" />

        <Skeleton width="20%" height={18} mb="s" />
        <Skeleton height={14} mb="xs" />
        <Skeleton height={14} mb="xs" />
        <Skeleton height={14} mb="xs" />
        <Skeleton height={14} mb="xs" />
        <Skeleton height={14} width="50%" mb="xl" />

        <Skeleton width="18%" height={18} mb="s" />
        <Box>
          <SkeletonTag width={140} />
          <SkeletonTag width={120} />
          <SkeletonTag width={100} />
          <SkeletonTag width={140} />
          <SkeletonTag width={180} />
        </Box>
      </Box>

      <Box pl="80px" width="100%">
        <Masonry columns={isLargeScreen ? 2 : 1}>
          <Skeleton height={400} />
          <Skeleton height={320} />
          <Skeleton height={460} />
          <Skeleton height={370} />
        </Masonry>
      </Box>
    </Box>
  );
}

export default DesktopLoading;
