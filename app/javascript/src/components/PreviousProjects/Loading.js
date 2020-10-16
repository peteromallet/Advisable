import { Box, Stack, Skeleton } from "@advisable/donut";

export default function PreviousProjectsLoading() {
  return (
    <Stack paddingY="l" spacing="l">
      <Box>
        <Skeleton mb="8px" height="16px" width="24%" />
        <Skeleton mb="8px" height="8px" />
        <Skeleton mb="8px" height="8px" />
        <Skeleton mb="8px" height="8px" width="80%" />
      </Box>
      <Box>
        <Skeleton mb="8px" height="16px" width="24%" />
        <Skeleton mb="8px" height="8px" />
        <Skeleton mb="8px" height="8px" />
        <Skeleton mb="8px" height="8px" width="80%" />
      </Box>
    </Stack>
  );
}
