import React from "react";
import { Skeleton, Box } from "@advisable/donut";
import Testimonials from "./Testimonials";

function Loading() {
  return (
    <Box paddingRight={{ _: null, l: 550 }}>
      <Box py="xxl" maxWidth={600} margin="0 auto" px="m">
        <Skeleton height={28} maxWidth={360} mb="s" />
        <Skeleton height={16} maxWidth={540} mb="xxs" />
        <Skeleton height={16} maxWidth={220} mb="xl" />

        <Skeleton height={12} maxWidth={230} mb="xxs" />
        <Skeleton height={40} maxWidth={560} mb="l" />

        <Skeleton height={12} maxWidth={180} mb="xxs" />
        <Skeleton height={40} maxWidth={560} mb="l" />

        <Skeleton height={12} maxWidth={230} mb="xxs" />
        <Skeleton height={40} maxWidth={560} mb="l" />
      </Box>
      <Box>
        <Testimonials />
      </Box>
    </Box>
  );
}

export default Loading;
