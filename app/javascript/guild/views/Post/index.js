import React from "react";
import { Card, Text, Avatar, Link, theme, Box, Button } from "@advisable/donut";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Loading from "@advisable-main/components/Loading";
import HeaderLayout from "@guild/components/Layouts/HeaderLayout";
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
import { css } from "styled-components";
// import { useToggle } from "@guild/hooks/useToggle";
// import { SubmitButton } from "@guild/components/Buttons/styles";
// import pluralize from "@advisable-main/utilities/pluralize";
// import ShowMore from "@guild/components/ShowMore";
// import { CREATE_GUILD_COMMENT } from "./mutations";
// import { truncate } from "lodash-es";

const Post = () => {
  const { postId } = useParams();
  const viewer = useViewer();

  const { data, loading } = useQuery(GUILD_POST_QUERY, {
    variables: { id: postId },
  });
  const post = data?.guildPost;

  // const { state } = useLocation();
  // const [createGuildComment] = useMutation(CREATE_GUILD_COMMENT);
  // const [showComments, toggleShowComments] = useToggle(true);
  // const commentsRef = useRef();
  // const commentsEffectRef = useCallback(
  //   (node) => {
  //     if (!node) return;
  //     commentsRef.current = node;
  //     if (state?.commentsAnchor) scrollToComments();
  //   },
  //   [state?.commentsAnchor],
  // );
  // const scrollToComments = () => {
  //   commentsRef.current?.scrollIntoView({
  //     behavior: "smooth",
  //   });
  // };

  if (loading) return <Loading />;

  return (
    data && (
      <HeaderLayout>
        <GuildBox display="flex" justifyContent="center" m={{ _: "s", m: "l" }}>
          <Card
            elevation={{ _: "s", m: "m" }}
            maxWidth={theme.breakpoints.l}
            width="100%"
          >
            {post.coverImage && (
              <CoverImage images={post.images} cover={post.coverImage.url} />
            )}

            {/* Header */}
            <GuildBox
              px={{ _: "s", s: "xxl" }}
              py="l"
              backgroundColor="ghostWhite100"
            >
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

              <GuildBox alignItems="start" spaceChildrenHorizontal={24}>
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
            </GuildBox>

            {/* Topics and Interactions */}
            <GuildBox
              px={{ _: "xs", s: "xxl" }}
              py="xs"
              minHeight="58px"
              flexSpaceBetween
              backgroundColor="#6770f10d"
              alignItems="center"
            >
              <Topics activeStyle topics={post.guildTopics} />

              <GuildBox
                display="flex"
                spaceChildrenHorizontal={8}
                alignSelf={"center"}
              >
                <OfferHelp
                  guildPostId={post.id}
                  recipient={post.author}
                  engagementsCount={post.engagementsCount}
                />
                <ReactionsButton post={post} />
              </GuildBox>

              {/* <StyledCommentsButton flexSpaceBetween onClick={scrollToComments}>
                <Text fontWeight="medium" size="xs" color="catalinaBlue100">
                  {post.commentsCount
                    ? pluralize(post.commentsCount, "Comment", "Comments")
                    : "Comments"}
                </Text>
                <Comments ml={12} size={16} />
              </StyledCommentsButton> */}
            </GuildBox>

            {/* Post body */}
            <GuildBox px={{ _: "s", m: "l", l: "80px" }} py="3xl">
              <Text
                size="m"
                lineHeight="l"
                color="quartz"
                css={css`
                  white-space: pre-wrap;
                  white-space: pre-line;
                `}
              >
                {post.body}
              </Text>
              {viewer.id === post.author.id && (
                <Box display="flex" justifyContent="flex-end">
                  <Button
                    size="s"
                    as={Link}
                    to={`/composer/${post.id}/edit`}
                    variant="subtle"
                    prefix={<Edit />}
                  >
                    Edit Post
                  </Button>
                </Box>
              )}
            </GuildBox>

            {/* Comments */}
            {/* <GuildBox
              ref={commentsEffectRef}
              px="xxl"
              py="m"
              display="flex"
              flexDirection="column"
              minHeight="165px"
            >
              <GuildBox
                mb="m"
                alignItems="baseline"
                spaceChildrenHorizontal={24}
              >
                <Text size="3xl" fontWeight="medium" color="catalinaBlue100">
                  {post.commentsCount
                    ? pluralize(post.commentsCount, "Comment", "Comments")
                    : "Comments"}
                </Text>
                <ShowMore
                  showingMore={showComments}
                  onToggle={toggleShowComments}
                  text={{ more: "Show", less: "Hide" }}
                />
              </GuildBox>

              <Textarea
                marginBottom="s"
                minRows={3}
                maxRows={8}
                placeholder="Join the Discussion ..."
              />
              <SubmitButton loading={false} type="submit">
                Submit
              </SubmitButton>
            </GuildBox> */}

            {/* Post Comments */}
            {/* {showComments && post.comments?.length > 0 && (
              <GuildBox px="xxl" py="l" spaceChildrenVertical={24}>
                {post.comments.map((comment, key) => (
                  <GuildBox key={key} spaceChildrenHorizontal={16}>
                    <GuildBox
                      height={"102px"}
                      width={"102px"}
                      backgroundColor="#FBFBFF"
                      flexShrink={0}
                      flexCenterBoth
                      spaceChildrenVertical={4}
                      borderRadius={2}
                      p="xxs"
                    >
                      <Avatar
                        width={"24px"}
                        as={Link}
                        to={`/profiles/${comment.author.id}`}
                        size="s"
                        name={comment.author.name}
                        url={comment.author.avatar}
                      />
                      <Text size="xs" color="quartz">
                        {truncate(
                          `${comment.author.firstName} ${comment.author.lastName?.[0]}`,
                          { length: 15 },
                        )}
                      </Text>
                      <Text size="xxs" color="darkGrey">
                        {comment.createdAtTimeAgo} ago
                      </Text>
                    </GuildBox>

                    <GuildBox
                      py="m"
                      px="l"
                      backgroundColor="aliceBlue"
                      borderRadius={2}
                    >
                      <Text lineHeight="l" color="catalinaBlue100">
                        {comment.body}
                      </Text>
                    </GuildBox>
                  </GuildBox>
                ))}
              </GuildBox>
            )} */}
          </Card>
        </GuildBox>
      </HeaderLayout>
    )
  );
};

// const StyledCommentsButton = styled(Button)`
//   padding: 6px 14px;
//   border-radius: 15px;
//   height: 29px;
//   background: white;

//   &:focus {
//     outline: none;
//     border: none;
//   }
//   svg {
//     margin-left: 12px;
//   }
//   &:hover {
//     background-color: ${theme.colors.lavender} !important;
//   }
//   filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.12));
// `;

export default Post;
