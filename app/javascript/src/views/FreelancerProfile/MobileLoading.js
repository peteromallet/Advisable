import { Box, Skeleton } from "@advisable/donut";

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

function MobileLoading() {
  return (
    <>
      <Skeleton height={300} mb="xl" />
      <Box px="m">
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
    </>
  );
}

export default MobileLoading;
