import React from "react";
import { Card, Text, Avatar, Link, Box } from "@advisable/donut";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Loading from "@advisable-main/components/Loading";
import NotFound from "@advisable-main/components/PreviousProjectFormModal/NotFound";
import { GUILD_POST_QUERY } from "./queries";
import Topics from "@guild/components/Post/components/Topics";
import { CoverImage } from "@guild/components/CoverImage";
import useViewer from "@advisable-main/hooks/useViewer";
import Markdown from "@guild/components/Markdown";
import PostTypeTag from "@guild/components/PostTypeTag";
import PostActions from "@guild/components/PostActions";
import ErrorBoundary from "@guild/components/ErrorBoundary";
import ConnectionsCount from "@guild/components/ConnectionsCount";
import ImageGallery, { useImageGallery } from "src/components/ImageGallery";
import JoinGuild from "./JoinGuild";
import { StyledImageThumbnail } from "./styles";

const Post = () => {
  const { postId } = useParams();
  const viewer = useViewer();
  const gallery = useImageGallery();

  const { data, loading } = useQuery(GUILD_POST_QUERY, {
    variables: { id: postId },
  });
  const post = data?.guildPost;
  const guildViewer = viewer?.guild;

  if (loading) return <Loading />;

  const otherImages = (post?.images || []).filter((p) => p.cover === false);

  return post ? (
    <ErrorBoundary>
      <Box pt={12} pb={20} mx="auto" maxWidth={["100%", "100%", "960px"]}>
        {post.images.length > 0 ? (
          <ImageGallery dialog={gallery} images={post.images} />
        ) : null}
        <Card>
          {post.coverImage && (
            <CoverImage
              height="480px"
              images={post.images}
              cover={post.coverImage.url}
              onClick={() => gallery.open(0)}
            />
          )}

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

          <Box px={{ _: "s", s: "xxl" }} pt={10} pb={14}>
            <Box mb={4}>
              <PostTypeTag post={post} />
            </Box>
            <Text fontWeight="medium" size="5xl" color="meutral900" mb={6}>
              {post.title}
            </Text>

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

              <Box display={{ _: "none", s: "flex" }} alignItems="center">
                <ConnectionsCount mr={3} post={post} />
                <PostActions post={post} />
              </Box>
            </Box>

            <Box mb={8}>
              <Markdown>{post.body}</Markdown>
            </Box>

            <Topics topics={post.guildTopics} />

            <Box my={10} height="1px" width="200px" mx="auto" bg="neutral100" />
            <Box display="flex" justifyContent="center">
              <PostActions size={{ _: "lg", md: "xl" }} post={post} />
            </Box>
            {!guildViewer && <JoinGuild />}
          </Box>
        </Card>
      </Box>
    </ErrorBoundary>
  ) : (
    <NotFound resource="Post" id={postId} />
  );
};

export default Post;
