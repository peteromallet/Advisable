import React from "react";
import { Box, Text, Button } from "@advisable/donut";
import { ExternalLink } from "@styled-icons/feather/ExternalLink";

export default function JoinGuild() {
  return (
    <Box
      mt={12}
      mx="auto"
      padding={12}
      id="joinGuild"
      bg="neutral100"
      maxWidth="600px"
      textAlign="center"
      borderRadius="12px"
    >
      <Text
        size="3xl"
        color="blue900"
        marginBottom={2}
        lineHeight="1.5rem"
        fontWeight="medium"
        letterSpacing="-0.02rem"
      >
        Want to join a community featuring the writer of this post & hundreds
        more like them?
      </Text>
      <Text lineHeight="1.2rem" color="neutral800" mb={8}>
        Advisable Guild is an invitation-only network that helps world-class
        freelancers from across 500+ marketing-related skills collaborate and
        connect.
      </Text>
      <Button
        size="l"
        mr="xs"
        as={"a"}
        href={"/freelancers/signup"}
        suffix={<ExternalLink />}
      >
        Apply To Access Now
      </Button>
    </Box>
  );
}
