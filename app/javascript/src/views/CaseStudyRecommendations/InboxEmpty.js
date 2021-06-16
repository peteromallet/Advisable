import React from "react";
import { Box, Text, Link } from "@advisable/donut";

export default function InboxEmpty() {
  return (
    <Box maxWidth="420px" marginX="auto" textAlign="center" paddingTop={4}>
      <InboxEmptyImage />
      <Text paddingTop={8} fontSize="xl" fontWeight={500} paddingBottom={2}>
        No Recommendations
      </Text>
      <Text color="neutral800" lineHeight="20px" marginBottom={8}>
        It looks like we don’t have any new recommendations for you at this
        time. We are adding more content every day and will notify you when we
        have any new recommendations.
      </Text>

      <Text fontSize="sm" fontWeight={450} mb={1}>
        Need to hire someone fast?
      </Text>
      <Link fontSize="sm">Talk with our recruitment team</Link>
    </Box>
  );
}

function InboxEmptyImage() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="300"
      height="204"
      fill="none"
      viewBox="0 0 300 204"
    >
      <rect
        width="300"
        height="60"
        fill="#2B2117"
        opacity="0.04"
        rx="16"
      ></rect>
      <rect
        width="32"
        height="36"
        x="12"
        y="12"
        fill="#2B2117"
        opacity="0.08"
        rx="12"
      ></rect>
      <rect
        width="160"
        height="10"
        x="56"
        y="16"
        fill="#2B2117"
        opacity="0.08"
        rx="4"
      ></rect>
      <rect
        width="226"
        height="10"
        x="56"
        y="34"
        fill="#2B2117"
        opacity="0.06"
        rx="4"
      ></rect>
      <rect
        width="300"
        height="60"
        y="72"
        fill="#2B2117"
        opacity="0.04"
        rx="16"
      ></rect>
      <rect
        width="32"
        height="36"
        x="12"
        y="84"
        fill="#2B2117"
        opacity="0.08"
        rx="12"
      ></rect>
      <rect
        width="160"
        height="10"
        x="56"
        y="88"
        fill="#2B2117"
        opacity="0.08"
        rx="4"
      ></rect>
      <rect
        width="226"
        height="10"
        x="56"
        y="106"
        fill="#2B2117"
        opacity="0.06"
        rx="4"
      ></rect>
      <rect
        width="300"
        height="60"
        y="144"
        fill="#2B2117"
        opacity="0.04"
        rx="16"
      ></rect>
      <rect
        width="32"
        height="36"
        x="12"
        y="156"
        fill="#2B2117"
        opacity="0.08"
        rx="12"
      ></rect>
      <rect
        width="160"
        height="10"
        x="56"
        y="160"
        fill="#2B2117"
        opacity="0.08"
        rx="4"
      ></rect>
      <rect
        width="226"
        height="10"
        x="56"
        y="178"
        fill="#2B2117"
        opacity="0.06"
        rx="4"
      ></rect>
    </svg>
  );
}
