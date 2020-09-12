import React from "react";
import { Box } from "@advisable/donut";

function Star() {
  return (
    <svg width="19" height="17" fill="none" viewBox="0 0 19 17">
      <path
        fill="currentColor"
        d="M9.49 0l2.503 5.976 6.497.517-4.95 4.211L15.053 17 9.49 13.626 3.928 17l1.512-6.296-4.95-4.21 6.497-.518L9.49 0z"
      ></path>
    </svg>
  );
}

function RatingStar({ filled }) {
  return (
    <Box color={filled ? "blue900" : "neutral200"}>
      <Star />
    </Box>
  );
}

function Rating({ label, rating }) {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box fontSize="m" color="neutral800" letterSpacing="-0.01em">
        {label}
      </Box>
      <Box display="flex">
        <RatingStar filled={rating >= 1} />
        <RatingStar filled={rating >= 2} />
        <RatingStar filled={rating >= 3} />
        <RatingStar filled={rating >= 4} />
        <RatingStar filled={rating >= 5} />
      </Box>
    </Box>
  );
}

export default Rating;
