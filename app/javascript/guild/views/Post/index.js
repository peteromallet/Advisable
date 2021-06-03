import React from "react";
import { Card, Text, Avatar, Link, Box } from "@advisable/donut";
import { useParams, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Loading from "@advisable-main/components/Loading";
import NotFound from "@advisable-main/components/PreviousProjectFormModal/NotFound";
import { GUILD_POST_QUERY } from "./queries";
import Topics from "@guild/components/Post/components/Topics";
import ResolvedNotice from "@guild/components/Post/components/ResolvedNotice";
import { CoverImage } from "@guild/components/CoverImage";
import useViewerAuthor from "@guild/hooks/useViewerAuthor";
import Markdown from "@guild/components/Markdown";
import PostTypeTag from "@guild/components/PostTypeTag";
import PostActions from "@guild/components/PostActions";
import ErrorBoundary from "@guild/components/ErrorBoundary";
import ConnectionsCount from "@guild/components/ConnectionsCount";
import ImageGallery, { useImageGallery } from "src/components/ImageGallery";
import JoinGuild from "./JoinGuild";
import PopularNotice from "@guild/components/Post/components/PopularNotice";
import { hasGqlError, loginWithRedirectPath } from "@guild/utils";
import { StyledImageThumbnail } from "./styles";

const Post = () => {
  const { postId } = useParams();
  const gallery = useImageGallery();
  const location = useLocation();

  const { data, loading } = useQuery(GUILD_POST_QUERY, {
    variables: { id: postId },
    onError: (errors) => {
      if (!viewer && hasGqlError("notAuthorized", errors)) {
        loginWithRedirectPath(location.pathname);
      }
    },
  });
  const post = data?.guildPost;

  const { viewer, isAuthor, popularOrAuthorReactions } = useViewerAuthor(post);
  const guildViewer = viewer?.guild;
  const otherImages = (post?.images || []).filter((p) => p.cover === false);

  if (loading) return <Loading />;
  if (viewer && !post) return <NotFound resource="Post" id={postId} />;

  return post ? (
    <ErrorBoundary>
      <Box
        pt={{ _: 0, l: 12 }}
        pb={20}
        mx="auto"
        maxWidth={["100%", "100%", "960px"]}
      >
        {post.images.length > 0 ? (
          <ImageGallery dialog={gallery} images={post.images} />
        ) : null}
        <Card
          borderBottom={popularOrAuthorReactions ? "6px solid #fde7b2" : null}
        >
          {post.coverImage ? (
            <CoverImage
              height={{ _: "260px", s: "340px", m: "480px" }}
              images={post.images}
              cover={post.coverImage.url}
              onClick={() => gallery.open(0)}
            />
          ) : null}

          {otherImages.length > 0 ? (
            <Box
              px={4}
              pt={4}
              display="grid"
              gridGap="16px"
              gridTemplateColumns={{
                _: "1fr 1fr 1fr",
                s: "1fr 1fr 1fr 1fr",
                m: "1fr 1fr 1fr 1fr 1fr",
              }}
            >
              {otherImages.map((i) => (
                <StyledImageThumbnail
                  key={i.id}
                  height="100px"
                  max-width="140px"
                  onClick={() => gallery.open(post.images.indexOf(i))}
                  style={{ backgroundImage: `url("${i.url}")` }}
                />
              ))}
            </Box>
          ) : null}

          <Box px={{ _: 6, s: "xxl" }} pt={10} pb={14}>
            <Box mb={4}>
              <PostTypeTag post={post} />
            </Box>
            <Text fontWeight="medium" size="5xl" color="meutral900" mb={6}>
              {post.title}
            </Text>

            {post.resolved ? (
              <ResolvedNotice authorName={post.author.firstName} />
            ) : null}

            <Box mb={10} display="flex" justifyContent="space-between">
              <Box display="flex" alignItems="center">
                <Avatar
                  size="s"
                  as={Link}
                  name={post.author.name}
                  url={post.author.avatar}
                  to={`/freelancers/${post.author.id}`}
                />
                <Box ml={3}>
                  <Link
                    mb={0.5}
                    variant="dark"
                    fontSize="l"
                    color="neutral900"
                    letterSpacing="-0.01rem"
                    to={`/freelancers/${post.author.id}/guild`}
                  >
                    {post.author.name}
                  </Link>
                  <Text fontSize="xs" color="neutral500">
                    {post.createdAtTimeAgo} ago
                  </Text>
                </Box>
              </Box>

              {!post.resolved ? (
                <Box display={{ _: "none", s: "flex" }} alignItems="center">
                  <ConnectionsCount mr={3} post={post} />
                  <PostActions post={post} />
                </Box>
              ) : null}
            </Box>

            <Box mb={8}>
              <Markdown>{post.body}</Markdown>
            </Box>

            <Topics topics={post.guildTopics} />

            <Box my={10} height="1px" width="200px" mx="auto" bg="neutral100" />

            {!guildViewer ? (
              <JoinGuild />
            ) : (
              (isAuthor || !post.resolved) && (
                <Box display="flex" justifyContent="center">
                  <PostActions size={{ _: "lg", md: "xl" }} post={post} />
                </Box>
              )
            )}
          </Box>
          {popularOrAuthorReactions && (
            <PopularNotice marginBottom="-4px" post={post} />
          )}
        </Card>
      </Box>
    </ErrorBoundary>
  ) : null;
};

export default Post;
