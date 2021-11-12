import React from "react";
import { StyledCard, Link, Box, Text } from "@advisable/donut";
import PassportAvatar from "src/components/PassportAvatar";
import css from "@styled-system/css";
import styled from "styled-components";

const StyledPostCard = styled(StyledCard)`
  box-shadow: 0 1px 6px rgba(28, 28, 37, 0.12);
  transition: box-shadow 200ms, transform 200ms;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 20px rgba(26, 35, 67, 0.14);
  }
`;

export default function CollaborationRequest({ request }) {
  return (
    <StyledPostCard
      as={Link}
      to={`/guild/posts/${request.id}`}
      elevation="s"
      borderRadius="20px"
      p={6}
    >
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
          <Text fontSize="xs" color="neutral500" lineHeight="s">
            {request.author?.location}
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
    </StyledPostCard>
  );
}
