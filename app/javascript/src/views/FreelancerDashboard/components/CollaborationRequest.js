import React from "react";
import { Card, Box, Text } from "@advisable/donut";
import PassportAvatar from "src/components/PassportAvatar";
import css from "@styled-system/css";

export default function CollaborationRequest({ request }) {
  return (
    <Card borderRadius="20px" p={6}>
      <Box
        display="flex"
        alignItems="center"
        css={css({ columnGap: 3 })}
        mb={4}
      >
        <PassportAvatar
          size="sm"
          src={request.author?.avatar}
          name={request.author?.name}
        />
        <Box>
          <Text color="neutral900" fontWeight={450} lineHeight="m">
            {request.author?.name}
          </Text>
          <Text fontSize="xs" color="neutral500" lineHeight="xs">
            {request.createdAtTimeAgo}
          </Text>
        </Box>
      </Box>
      <Text
        color="neutral900"
        fontWeight={450}
        fontSize="3xl"
        lineHeight="l"
        mb={4}
      >
        {request.title}
      </Text>
      <Text color="neutral700" lineHeight="s">
        {request.excerpt}
      </Text>
    </Card>
  );
}
