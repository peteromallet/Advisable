import React from "react";
import * as Sentry from "@sentry/react";
import { Box, Card, Text, Avatar, Link } from "@advisable/donut";
import Topics from "./components/Topics";
import Markdown from "../Markdown";
import PostTypeTag from "@guild/components/PostTypeTag";
import MessageAction from "@guild/components/PostAction/Message";
import ReactionsButton from "./components/ReactionsButton";
import { GuildBox } from "@guild/styles";
import { CoverImage } from "@guild/components/CoverImage";
import OfferHelp from "./components/OfferHelp";

const Post = ({ post }) => {
  const url = `/guild/posts/${post.id}`;

  const handleOpen = () => {
    // We need to use an actual page load while the guild pack is separate.
    window.location = url;
  };

  return (
    <Sentry.ErrorBoundary>
      <Card position="relative" padding="8" borderRadius="12px" width="100%">
        <Box position="absolute" right="4" top="4">
          <PostTypeTag post={post} />
        </Box>

        <Box display="flex" marginBottom="5" alignItems="center">
          <Avatar
            as={Link}
            to={`/freelancers/${post.author.id}`}
            size="s"
            name={post.author.name}
            url={post.author.avatar}
          />
          <Box ml="3">
            <Text
              mb={0.5}
              fontSize="l"
              as={Link.External}
              color="neutral900"
              letterSpacing="-0.01rem"
              href={`/freelancers/${post.author.id}`}
            >
              {post.author.name}
            </Text>
            <Text fontSize="xs" letterSpacing="-0.01rem" color="neutral600">
              {post.createdAtTimeAgo} ago
            </Text>
          </Box>
        </Box>

        {post.coverImage && (
          <Box mb="6">
            <a href={url}>
              <CoverImage cover={post.coverImage.url} />
            </a>
          </Box>
        )}

        <Text
          mb="4"
          fontSize="4xl"
          color="neutral900"
          as={Link.External}
          fontWeight="medium"
          letterSpacing="-0.03rem"
          href={url}
        >
          {post.title}
        </Text>

        <Box mb="4" onClick={handleOpen} style={{ cursor: "pointer" }}>
          <Markdown>{post.excerpt}</Markdown>
        </Box>

        <Text mb="8" href={url} fontSize="s" color="blue700" as={Link.External}>
          Read more
        </Text>

        <Box mb="4">
          <GuildBox ml="xxs" display="flex" spaceChildrenHorizontal={8}>
            <OfferHelp
              guildPostId={post.id}
              recipient={post.author}
              engagementsCount={post.engagementsCount}
            />
            <MessageAction post={post} />
            <ReactionsButton post={post} />
          </GuildBox>
        </Box>

        <Topics topics={post.guildTopics} />
      </Card>
    </Sentry.ErrorBoundary>
  );
};

export default Post;
