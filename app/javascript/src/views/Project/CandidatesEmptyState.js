import React from "react";
import { Card, Skeleton, Box, Text, Paragraph } from "@advisable/donut";

export default function CandidatesEmptyState() {
  return (
    <Box maxWidth="400px" marginX="auto" paddingY="64px">
      <Card
        borderRadius="12px"
        width="280px"
        marginX="auto"
        padding="24px"
        marginBottom="40px"
      >
        <Skeleton height="64px" width="64px" borderRadius="50%" mb="24px" />
        <Skeleton height="16px" width="60%" mb="8px" />
        <Skeleton height="12px" width="82%" mb="24px" />
        <Skeleton height="1px" width="100%" mb="16px" />
        <Box display="flex" justifyContent="space-between">
          <Skeleton height="10px" width="32%" />
          <Skeleton height="10px" width="24%" />
        </Box>
        <Skeleton height="1px" width="100%" my="16px" />
        <Box display="flex" justifyContent="space-between">
          <Skeleton height="10px" width="28%" />
          <Skeleton height="10px" width="32%" />
        </Box>
      </Card>
      <Text
        fontSize="xl"
        color="neutral900"
        textAlign="center"
        marginBottom="8px"
        fontWeight="medium"
        letterSpacing="-0.01em"
      >
        No Candidates
      </Text>
      <Paragraph textAlign="center">
        You have not accepted any candidates yet. Once you accept a candidate
        they will show up here.
      </Paragraph>
    </Box>
  );
}
