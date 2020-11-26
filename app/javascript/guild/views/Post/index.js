import React, { useRef, useCallback } from "react";
import {
  Card,
  Text,
  Avatar,
  Link,
  theme,
  Box,
  Button,
  DialogDisclosure,
  useModal,
} from "@advisable/donut";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Loading from "@advisable-main/components/Loading";
import NotFound from "@advisable-main/components/PreviousProjectFormModal/NotFound";
import { GuildBox } from "@guild/styles";
import { Edit } from "@styled-icons/feather";
import GuildTag from "@guild/components/GuildTag";
import { NeedHelp } from "@guild/icons";
import OfferHelp from "@guild/components/Post/components/OfferHelp";
import { GUILD_POST_QUERY } from "./queries";
import Topics from "@guild/components/Post/components/Topics";
import { CoverImage } from "@guild/components/CoverImage";
import ReactionsButton from "@guild/components/Post/components/ReactionsButton";
import useViewer from "@advisable-main/hooks/useViewer";
import Markdown from "@guild/components/Markdown";
import ShareModal from "@guild/components/Post/components/ShareModal";
import { Share2 as Share, ExternalLink } from "@styled-icons/feather";
import ErrorBoundary from "@guild/components/ErrorBoundary";

const Post = () => {
  const { postId } = useParams();
  const viewer = useViewer();
  const shareModal = useModal();

  const { data, loading } = useQuery(GUILD_POST_QUERY, {
    variables: { id: postId },
  });
  const post = data?.guildPost;
  const guildViewer = viewer?.guild;

  const joinGuildRef = useRef();
  const joinGuildEffectRef = useCallback(
    (node) => {
      if (!node) return;
      joinGuildRef.current = node;
    },
    [guildViewer],
  );
  const scrollToJoinGuild = () => {
    joinGuildRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handlePostInteractions = () => {
    if (guildViewer) return;
    scrollToJoinGuild();
  };

  if (loading) return <Loading />;

  return post ? (
    <ErrorBoundary>
      {post.shareable && (
        <ShareModal externalUrl={window.location.href} modal={shareModal} />
      )}
      <Box display="flex" justifyContent="center" m={{ _: "s", m: "l" }}>
        <Card
          elevation={{ _: "s", m: "m" }}
          maxWidth={theme.breakpoints.l}
          width="100%"
        >
          {post.coverImage && (
            <CoverImage images={post.images} cover={post.coverImage.url} />
          )}

          {/* Header */}
          <Box px={{ _: "s", s: "xxl" }} py="l" backgroundColor="ghostWhite100">
            <GuildBox mb="l" flexSpaceBetween>
              <Text fontWeight="medium" size="4xl" color="catalinaBlue100">
                {post.title}
              </Text>
              {post.needHelp ? (
                <GuildTag variant="needHelp">
                  <NeedHelp size={20} />
                  <span>Need Help</span>
                </GuildTag>
              ) : (
                <GuildTag>{post.type}</GuildTag>
              )}
            </GuildBox>

            <Box display="flex" justifyContent="space-between">
              <GuildBox alignItems="start" spaceChildrenHorizontal={24}>
                <Avatar
                  as={Link}
                  to={`/freelancers/${post.author.id}`}
                  size={{ _: "s", m: "m" }}
                  name={post.author.name}
                  url={post.author.avatar}
                />
                <Box
                  display="flex"
                  justifyContent="center"
                  alignSelf="center"
                  flexDirection="column"
                >
                  <Text fontSize="m" fontWeight="light" color="quartz">
                    {post.author.name}
                  </Text>
                  <Text fontSize="xs" fontWeight="light" color="darkGrey">
                    {post.createdAtTimeAgo} ago
                  </Text>
                </Box>
              </GuildBox>

              {post.shareable && (
                <DialogDisclosure
                  button
                  size="s"
                  as={GuildTag}
                  {...shareModal}
                  aria-label="Share Post"
                >
                  <Share color={theme.colors.catalinaBlue100} size={18} />
                  <span>Share Post</span>
                </DialogDisclosure>
              )}
            </Box>
          </Box>

          {/* Topics and Interactions */}
          <GuildBox
            px={{ _: "xs", s: "xxl" }}
            py="xs"
            minHeight="58px"
            flexSpaceBetween
            backgroundColor="#6770f10d"
            alignItems="center"
          >
            <Topics topics={post.guildTopics} />

            <GuildBox
              display="flex"
              spaceChildrenHorizontal={8}
              alignSelf={"center"}
              onClick={handlePostInteractions}
            >
              <OfferHelp
                guildPostId={post.id}
                recipient={post.author}
                engagementsCount={post.engagementsCount}
              />
              <ReactionsButton post={post} />
            </GuildBox>
          </GuildBox>

          {/* Post body */}
          <Box px={{ _: "s", m: "l", l: "80px" }} py="3xl">
            <Markdown>{post.body}</Markdown>

            {viewer?.id === post.author.id && (
              <Box display="flex" justifyContent="flex-end">
                <Button
                  size="s"
                  as={Link}
                  to={`/composer/${post.id}/post`}
                  variant="subtle"
                  prefix={<Edit />}
                >
                  Edit Post
                </Button>
              </Box>
            )}
          </Box>

          {/* Join Guild */}
          {!guildViewer && (
            <>
              <Box height={1} bg="neutral100" my="l" />
              <GuildBox
                ref={joinGuildEffectRef}
                spaceChildrenVertical={24}
                p="l"
                maxWidth="600px"
                margin="0 auto"
                mb="l"
              >
                <Text size="l" lineHeight="m" fontWeight="medium">
                  Want to join a community featuring the writer of this post &
                  hundreds more like them?
                </Text>
                <Text size="l" lineHeight="m" color="catalinaBlue100">
                  Advisable Guild is an invitation-only network that helps
                  world-class freelancers from across 500+ marketing-related
                  skills collaborate and connect.
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
              </GuildBox>
            </>
          )}
        </Card>
      </Box>
    </ErrorBoundary>
  ) : (
    <NotFound resource="Post" id={postId} />
  );
};

export default Post;
