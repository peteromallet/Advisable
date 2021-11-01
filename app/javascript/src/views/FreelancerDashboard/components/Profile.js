import React from "react";
import { Box, Button, Text } from "@advisable/donut";
import PassportAvatar from "src/components/PassportAvatar";
import useViewer from "src/hooks/useViewer";
import css from "@styled-system/css";

export default function Hero({ caseStudies, reviews }) {
  const viewer = useViewer();

  return (
    <>
      <Box display="flex">
        <PassportAvatar src={viewer.avatar} name={viewer.name} size="xl" />
        <Box>
          <Text fontSize="3xl" fontWeight={550} color="neutral900">
            {viewer.name}
          </Text>
          <Box display="flex">
            <Text marginRight={5}>
              <span>{caseStudies.length}</span> case studies
            </Text>
            <Text>
              <span>{reviews.length}</span> testimonials
            </Text>
          </Box>
          <Button variant="ghost" size="s">
            Update profile
          </Button>
        </Box>
      </Box>
    </>
  );
}
