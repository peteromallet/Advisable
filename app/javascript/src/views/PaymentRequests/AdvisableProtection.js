import React from "react";
import { Box, Link, Text } from "@advisable/donut";
import { ShieldCheck } from "@styled-icons/heroicons-solid";

export default function AdvisableProtection() {
  return (
    <Box display="flex">
      <Box flexShrink={0} color="blue600">
        <ShieldCheck size={28} />
      </Box>
      <Box paddingLeft={4}>
        <Text fontWeight={520} marginBottom={1.5} fontSize="l">
          Protected by Advisable
        </Text>
        <Text lineHeight="24px" color="neutral900" marginBottom={1.5}>
          As per your agreement, you should always pay through Advisable to
          ensure you are protected.
        </Text>
        <Text lineHeight="24px" fontSize="sm" color="neutral600">
          If you have any questions please contact{" "}
          <Link.External href="mailto:finance@advisable.com" variant="dark">
            finance@advisable.com
          </Link.External>
          .
        </Text>
      </Box>
    </Box>
  );
}
