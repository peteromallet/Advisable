import React from "react";
import { Card, Text, Avatar, Link, Box } from "@advisable/donut";
import { Navigate, useParams, useLocation } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Loading from "src/components/Loading";
import NotFound, { isNotFound } from "src/views/NotFound";
import { GUILD_POST_QUERY } from "./queries";
import { CoverImage } from "@guild/components/CoverImage";
import Markdown from "@guild/components/Markdown";
import PostTypeTag from "@guild/components/PostTypeTag";
import PostActions from "@guild/components/PostActions";
import ErrorBoundary from "@guild/components/ErrorBoundary";
import ConnectionsCount from "@guild/components/ConnectionsCount";
import ImageGallery, { useImageGallery } from "src/components/ImageGallery";
import { hasGqlError } from "@guild/utils";
import ResolvedNotice from "./ResolvedNotice";
import JoinGuild from "./JoinGuild";
import Topics from "./Topics";
import { StyledImageThumbnail } from "./styles";
import CaseStudyContent from "src/components/CaseStudyContent";
import useViewer from "src/hooks/useViewer";

const Post = () => {
  const viewer = useViewer();
  const { postId } = useParams();
  const gallery = useImageGallery();
  const location = useLocation();

  const { data, loading, error } = useQuery(GUILD_POST_QUERY, {
    variables: { id: postId },
  });

  if (!viewer && hasGqlError("NOT_AUTHORIZED", error)) {
    return (
      <Navigate
        to={{
          pathname: "/login",
          state: { from: location },
        }}
      />
    );
  }

  const post = data?.guildPost;
  const isAuthor = viewer?.id === post?.author?.id;
  const guildViewer = viewer?.isSpecialist && viewer?.isAccepted;
  const otherImages = (post?.images || []).filter((p) => p.cover === false);

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

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
        <Card>
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
            <PostTypeTag post={post} mb={4} />
            <Text
              fontWeight="semibold"
              size="5xl"
              color="meutral900"
              py={0.5}
              mb={6}
              lineHeight="4xl"
            >
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
                  to={post.author.profilePath}
                />
                <Box ml={3}>
                  <Link
                    mb={0.5}
                    variant="dark"
                    fontSize="l"
                    color="neutral900"
                    letterSpacing="-0.01rem"
                    to={post.author.profilePath}
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
              {post.article ? (
                <CaseStudyContent caseStudy={post.article} />
              ) : (
                <Markdown>{post.body}</Markdown>
              )}
            </Box>

            <Topics topics={post.guildTopics} />

            <Box
              my={10}
              height="4px"
              borderTop="1px solid"
              borderColor="neutral100"
              width="200px"
              mx="auto"
            />

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
        </Card>
      </Box>
    </ErrorBoundary>
  ) : null;
};

export default Post;
