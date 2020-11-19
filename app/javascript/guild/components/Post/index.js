import React from "react";
import { Box, Card, Text, Avatar, Link, useBreakpoint } from "@advisable/donut";
import GuildTag from "@guild/components/GuildTag";
import Topics from "./components/Topics";
import { NeedHelp } from "@guild/icons";
import Markdown from "../Markdown";
import ReactionsButton from "./components/ReactionsButton";
import { GuildBox } from "@guild/styles";
import { CoverImage } from "@guild/components/CoverImage";
import OfferHelp from "./components/OfferHelp";

const Post = ({ post }) => {
  const mediumAndUp = useBreakpoint("mUp");
  const url = `/guild/posts/${post.id}`;

  const handleOpen = () => {
    // We need to use an actual page load while the guild pack is separate.
    window.location = url;
  };

  return (
    <Card padding="8" borderRadius="12px" width="100%">
      <Box
        marginBottom="5"
        display="flex"
        justifyContent="space-between"
        alignItems="start"
      >
        <Box display="flex">
          <Avatar
            as={Link}
            to={`/freelancers/${post.author.id}`}
            size="s"
            name={post.author.name}
            url={post.author.avatar}
          />
          <Box
            ml="3"
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <Text
              mb={0.5}
              fontSize="l"
              color="neutral900"
              letterSpacing="-0.01rem"
            >
              {post.author.name}
            </Text>
            <Text fontSize="xs" letterSpacing="-0.01rem" color="neutral600">
              {post.createdAtTimeAgo} ago
            </Text>
          </Box>
        </Box>
        {post.needHelp ? (
          <GuildTag variant="needHelp">
            {mediumAndUp && <NeedHelp size={20} />}
            <span>Need Help</span>
          </GuildTag>
        ) : (
          <GuildTag>{post.type}</GuildTag>
        )}
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
        Read More
      </Text>

      <Box mb="4">
        <GuildBox ml="xxs" display="flex" spaceChildrenHorizontal={8}>
          <OfferHelp
            guildPostId={post.id}
            recipient={post.author}
            engagementsCount={post.engagementsCount}
          />
          <ReactionsButton post={post} />
        </GuildBox>
      </Box>

      <Topics topics={post.guildTopics} />
    </Card>
  );
};

export default Post;
