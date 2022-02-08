import React from "react";
import { Box, Text, Link } from "@advisable/donut";
import { ShieldCheck } from "@styled-icons/heroicons-solid";

export default function AdvisableProtection() {
  return (
    <Box display="flex">
      <Box flexShrink={0} color="blue600">
        <ShieldCheck size={28} />
      </Box>
      <Box paddingLeft={4}>
        <Text fontWeight={520} marginBottom={1} fontSize="l">
          Protected by Advisable
        </Text>
        <Text lineHeight="24px" color="neutral800" marginBottom={2}>
          You should always pay and communicate through Advisable to ensure you
          are protected by our $1,000 risk free trail.
        </Text>
        <Link.External
          variant="underlined"
          href="https://www.advisable.com/faq#freelancers-faq"
          target="_blank"
        >
          Learn more
        </Link.External>
      </Box>
    </Box>
  );
}
