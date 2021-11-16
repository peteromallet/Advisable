import React from "react";
import * as Sentry from "@sentry/react";
import ConnectionsCount from "@guild/components/ConnectionsCount";
import css from "@styled-system/css";
import styled from "styled-components";
import { StyledCard, Link, Box, Text } from "@advisable/donut";
import PassportAvatar from "src/components/PassportAvatar";

const StyledPostCard = styled(StyledCard)(
  css({
    cursor: "pointer",
    boxShadow: "0 1px 6px rgba(28, 28, 37, 0.12)",
    transition: "box-shadow 200ms, transform 200ms",
    borderRadius: "20px",
    padding: 6,

    "&:hover": {
      transform: "translateY(-2px)",
      boxShadow: "0px 4px 20px rgba(26, 35, 67, 0.14)",
    },
  }),
);

export default function CollaborationRequest({ request }) {
  return (
    <Sentry.ErrorBoundary>
      <StyledPostCard as={Link} to={`/posts/${request.id}`} elevation="s">
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
            <Text
              color="neutral900"
              fontWeight={520}
              lineHeight="m"
              letterSpacing="-0.01rem"
            >
              {request.author?.name}
            </Text>
            <Text fontSize="sm" color="neutral600" lineHeight="s">
              {request.author?.location}
            </Text>
          </Box>
        </Box>
        <Text
          color="neutral900"
          fontWeight={520}
          fontSize="2xl"
          lineHeight="l"
          letterSpacing="-0.02rem"
          mb={3}
        >
          {request.title}
        </Text>
        <Text color="neutral700" fontWeight={420} lineHeight="20px">
          {request.excerpt}
        </Text>

        <Box marginTop={1}>
          {request.engagementsCount > 0 && (
            <Box marginTop={5} display="flex" alignItems="center">
              <ConnectionsCount post={request} display="inline" />
            </Box>
          )}
        </Box>
      </StyledPostCard>
    </Sentry.ErrorBoundary>
  );
}
