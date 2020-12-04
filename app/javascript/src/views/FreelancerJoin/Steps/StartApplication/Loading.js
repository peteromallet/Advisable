import React from "react";
import { Box, Skeleton } from "@advisable/donut";

export default function Loading() {
  return (
    <Box>
      <Box mb={{ s: 8 }}>
        <Box mb={{ _: 3, s: 5 }}>
          <Skeleton height={20} mb={{ _: 1.5, s: 3 }} width="100%" />
          <Skeleton height={20} mb={{ _: 1.5, s: 3 }} width="100%" />
          <Skeleton height={20} width="100%" />
        </Box>
        <Box
          display="flex"
          flexDirection={{ _: "column", s: "row" }}
          py={"17px"}
          mb={{ s: 5 }}
          justifyContent="space-between"
        >
          <Skeleton
            height={{ _: 28, s: 40 }}
            width={{ _: "100%", s: 160 }}
            mb={{ _: 2.5, s: 0 }}
          />
          <Skeleton
            height={{ _: 28, s: 40 }}
            width={{ _: "100%", s: 160 }}
            mb={{ _: 2.5, s: 0 }}
          />
          <Skeleton
            height={{ _: 28, s: 40 }}
            width={{ _: "100%", s: 160 }}
            mb={{ _: 2.5, s: 0 }}
          />
        </Box>
        <Box display={{ _: "none", s: "block" }}>
          <Skeleton height={20} width="100%" mb={1} />
          <Skeleton height={20} width="100%" />
        </Box>
      </Box>
      <Box>
        <Box mb={4}>
          <Skeleton height={16} width={70} mb={{ _: 1, m: 2 }} />
          <Skeleton height={{ _: 40, m: 48 }} width="100%" />
        </Box>
        <Box mb={4}>
          <Skeleton height={16} width={70} mb={{ _: 1, m: 2 }} />
          <Skeleton height={{ _: 40, m: 48 }} width="100%" />
        </Box>
        <Box
          pt={{ _: 4, s: 6 }}
          display="flex"
          flexDirection={{ _: "column", m: "row" }}
        >
          <Skeleton
            width={{ _: "100%", m: 140 }}
            mb={{ _: 3, m: 0 }}
            height={{ _: 42, s: 50 }}
          />
          <Skeleton
            ml="auto"
            mr={{ _: "auto", m: 0 }}
            width={{ _: 230, m: 140 }}
            height={{ _: 16, m: 50 }}
          />
        </Box>
      </Box>
    </Box>
  );
}
