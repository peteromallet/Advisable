import React from "react";
import { times } from "lodash-es";
import { Box, Card, Skeleton, Stack } from "@advisable/donut";

function Loading() {
  const loadingInvoicesCards = times(3).map((_, index) => (
    <Card key={`loading-card-${index}`} p="24px" pr="26px">
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Box mr="auto">
          <Skeleton width={120} height={17} mb="xxs" />
          <Skeleton width={120} height={14} />
        </Box>
        <Skeleton width={55} height={24} borderRadius={12} />
        <Skeleton height={17} width={43} ml={["xs", "s"]} />
      </Box>
    </Card>
  ));

  return (
    <Box>
      <Skeleton width={83} height={20} mb="m" />
      <Stack spacing="xs">{loadingInvoicesCards}</Stack>
    </Box>
  );
}

export default Loading;
