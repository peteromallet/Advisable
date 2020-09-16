import React from "react";
import { Box, Card, Text, Avatar, Link, useBreakpoint } from "@advisable/donut";
import GuildTag from "@guild/components/GuildTag";
import Topics from "./components/Topics";
import NeedHelp from "@guild/icons/NeedHelp";
import CommentsButton from "./components/CommentsButton";

const Post = ({ post }) => {
  const mediumAndUp = useBreakpoint("mUp");
  const { author } = post;

  return (
    <Card elevation={{ _: "s", m: "m" }} width="100%">
      <Box display="flex" flexDirection="column" p={{ _: "s", m: "l" }}>
        {/* Author Details, Post Type */}
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Box display="flex">
            <Avatar
              as={Link}
              to={`/profiles/${author.id}`}
              size={{ _: "s", m: "m" }}
              name={author.name}
              url={author.avatar}
            />
            <Box
              display="flex"
              justifyContent="center"
              flexDirection="column"
              ml="s"
            >
              <Text
                fontSize="m"
                fontWeight="light"
                letterSpacing="-0.01em"
                color="quartz"
                mb="xxs"
              >
                {author.name}
              </Text>
              <Text
                fontSize="xxs"
                fontWeight="light"
                letterSpacing="-0.01em"
                color="darkGrey"
              >
                {post.createdAtTimeAgo} ago
              </Text>
            </Box>
          </Box>
          {post.needHelp ? (
            <GuildTag variant="needHelp">
              {mediumAndUp && <NeedHelp width="20" height="20" />}
              <span>Need Help</span>
            </GuildTag>
          ) : (
            <GuildTag>{post.type}</GuildTag>
          )}
        </Box>

        {/* Post Title, Body */}
        <Box display="flex" flexDirection="column" my="l">
          <Text
            as={Link}
            mb="sm"
            fontSize="xxl"
            fontWeight="medium"
            letterSpacing="-0.01em"
            color="catalinaBlue100"
            to={`/posts/${post.id}`}
          >
            {post.title}
          </Text>

          {/* TODO draftjs reader */}
          <Text
            fontSize="xs"
            fontWeight="light"
            letterSpacing="-0.01em"
            color="quartz"
            lineHeight="s"
          >
            {post.body}
          </Text>
        </Box>
      </Box>

      {/* Topics and Interactions */}
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        width={"100%"}
        px="l"
        py="14px"
        backgroundColor="aliceBlue"
      >
        <Topics topics={post.guildTopics} />
        <CommentsButton postId={post.id} commentsCount={post.comments_count} />
      </Box>
    </Card>
  );
};

export default Post;
