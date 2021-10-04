import React from "react";
import * as Sentry from "@sentry/react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Card, Text, Avatar, Link, Stack } from "@advisable/donut";
import Topics from "@guild/components/Post/components/Topics";
import PostTypeTag from "@guild/components/PostTypeTag";
import { isGuildPath } from "@guild/utils";
import pluralize from "src/utilities/pluralize";

const PopularPost = ({ post }) => {
  const url = `/guild/posts/${post.id}`;

  return (
    <Sentry.ErrorBoundary>
      <Card
        position="relative"
        paddingX={"l"}
        paddingY={"xl"}
        borderRadius="12px"
        width="100%"
        data-testid="post"
      >
        <Box position="absolute" right="4" top="4">
          <PostTypeTag size={["xs", "s"]} post={post} />
        </Box>

        <Box display="flex" marginBottom="5" alignItems="center">
          <Avatar
            as={RouterLink}
            to={`/freelancers/${post.author.id}/guild`}
            size="xs"
            name={post.author.name}
            url={post.author.avatar}
          />
          <Box ml="3">
            <Link
              mb={0.5}
              variant="dark"
              fontSize={["15px", "m"]}
              color="neutral900"
              letterSpacing="-0.01rem"
              to={`/freelancers/${post.author.id}/guild`}
            >
              {post.author.name}
            </Link>
            <Text fontSize="xs" letterSpacing="-0.01rem" color="neutral600">
              {post.createdAtTimeAgo} ago
            </Text>
          </Box>
        </Box>

        <Stack spacing="xs">
          <Text
            display="block"
            fontSize={["xl", "2xl"]}
            color="neutral900"
            fontWeight="medium"
            letterSpacing="-0.03rem"
            as={isGuildPath ? RouterLink : Link.External}
            to={url}
            href={url}
          >
            {post.title}
          </Text>

          {post.engagementsCount > 0 ? (
            <Text fontSize="sm" color="neutral500">
              {pluralize(post.engagementsCount, "connection", "connections")}
            </Text>
          ) : null}

          <Topics topics={post.guildTopics} />
        </Stack>
      </Card>
    </Sentry.ErrorBoundary>
  );
};

export default PopularPost;
