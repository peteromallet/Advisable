import React, { useCallback, useState } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Box, Card, Text, Avatar, Link, useBreakpoint } from "@advisable/donut";
import GuildTag from "@guild/components/GuildTag";
import Topics from "./components/Topics";
import { NeedHelp } from "@guild/icons";
import ReactionsButton from "./components/ReactionsButton";
import { GuildBox } from "@guild/styles";
import ReadMore from "./components/ReadMore";
import { CoverImage } from "@guild/components/CoverImage";
import OfferHelp from "./components/OfferHelp";
import { GUILD_UPDATE_POST_REACTIONS } from "./mutations";

const Post = ({ post }) => {
  const history = useHistory();
  const mediumAndUp = useBreakpoint("mUp");
  const [wrapBody, setWrapBody] = useState(false);

  const bodyMaxHeight = 220;
  const bodyRef = useCallback(
    (node) => {
      if (!node || wrapBody) return;
      if (node.getBoundingClientRect().height === bodyMaxHeight)
        setWrapBody(true);
    },
    [wrapBody],
  );

  const handleReadMore = () => history.push(`/posts/${post.id}`);

  const [guildUpdatePostReactions] = useMutation(GUILD_UPDATE_POST_REACTIONS);
  const handleUpdatePostReactions = async () => {
    await guildUpdatePostReactions({
      variables: { input: { guildPostId: post.id } },
    });
  };

  return (
    <Card elevation={{ _: "s", m: "m" }} width="100%">
      {post.coverImage && <CoverImage src={post.coverImage} />}
      <Box display="flex" flexDirection="column" p={{ _: "s", m: "l" }}>
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Box display="flex">
            <Avatar
              as={Link}
              to={`/profiles/${post.author.id}`}
              size={{ _: "s", m: "m" }}
              name={post.author.name}
              url={post.author.avatar}
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
                {post.author.name}
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
              {mediumAndUp && <NeedHelp size={20} />}
              <span>Need Help</span>
            </GuildTag>
          ) : (
            <GuildTag>{post.type}</GuildTag>
          )}
        </Box>

        <Box display="flex" flexDirection="column" mt="m">
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
          <Box
            overflow="hidden"
            position="relative"
            maxHeight={bodyMaxHeight}
            ref={bodyRef}
          >
            <Text fontSize="s" color="quartz" lineHeight="m">
              {post.body}
            </Text>
            {wrapBody && <ReadMore onReadMore={handleReadMore} />}
          </Box>
        </Box>
      </Box>

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
        <GuildBox display="flex" spaceChildrenHorizontal={8}>
          <OfferHelp
            guildPostId={post.id}
            recipient={post.author}
            engagementsCount={post.engagementsCount}
          />
          <ReactionsButton
            reacted={post.reacted}
            reactionsCount={post.reactionsCount}
            onUpdatePostReactions={handleUpdatePostReactions}
          />
        </GuildBox>
      </Box>
    </Card>
  );
};

export default Post;
