import React from "react";
import {
  Card,
  Text,
  Avatar,
  Link,
  Button,
  theme,
  Textarea,
  Box,
} from "@advisable/donut";
import styled from "styled-components";
import { Formik, Form } from "formik";
import { useParams } from "react-router-dom";
import FormField from "@advisable-main/components/FormField";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useMutation, useQuery } from "@apollo/client";
import Loading from "@advisable-main/components/Loading";
import pluralize from "@advisable-main/utilities/pluralize";
import HeaderLayout from "@guild/components/Layouts/HeaderLayout";
import { useToggle } from "@guild/hooks/useToggle";
import { GuildBox } from "@guild/styles";
import ShowMore from "@guild/components/ShowMore";
import GuildTag from "@guild/components/GuildTag";
import NeedHelp from "@guild/icons/NeedHelp";
import { CREATE_GUILD_COMMENT } from "./mutations";
import { GUILD_POST_QUERY } from "./queries";
import DirectMessage from "./components/DirectMessage";
import Topics from "@guild/components/Post/components/Topics";
import Comments from "@guild/icons/Comments";

const Post = () => {
  const { postId } = useParams();
  const { data, loading } = useQuery(GUILD_POST_QUERY, {
    variables: { id: postId },
  });
  const post = data?.guildPost;

  const [createGuildComment] = useMutation(CREATE_GUILD_COMMENT);

  const [showComments, toggleShowComments] = useToggle(true);

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
            {/* Header */}
            <GuildBox px="xxl" py="l" backgroundColor="ghostWhite100">
              <GuildBox mb="l" flexSpaceBetween>
                <Text fontWeight="medium" size="4xl" color="catalinaBlue100">
                  {post.title}
                </Text>
                {post.needHelp ? (
                  <GuildTag variant="needHelp">
                    <NeedHelp width="20" height="20" />
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
                <DirectMessage count={3} onClick={null} />
                <Box
                  display="flex"
                  justifyContent="center"
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
            {/* post.images.length && post.coverImage  */}

            {/* Topics and Interactions */}
            <GuildBox
              px="xxl"
              height="58px"
              flexSpaceBetween
              backgroundColor="ghostWhite"
              alignItems="center"
            >
              {/* Topics */}
              <Topics activeStyle topics={post.guildTopics} />

              <StyledCommentsButton flexSpaceBetween>
                <Text fontWeight="medium" size="xs" color="catalinaBlue100">
                  {post.commentsCount
                    ? pluralize(post.commentsCount, "Comment", "Comments")
                    : "Comments"}
                </Text>
                <Comments ml={12} width={16} height={16} />
              </StyledCommentsButton>
            </GuildBox>

            {/* Post body */}
            <GuildBox px={{ _: "s", m: "l", l: "80px" }} py="l">
              <Text size="m" color="quartz">
                {post.body}
              </Text>
            </GuildBox>

            {/* Comments */}
            <section id="comments">
              <GuildBox
                px="xxl"
                display="flex"
                flexDirection="column"
                minHeight="165px"
              >
                <GuildBox
                  mb="m"
                  alignItems="baseline"
                  spaceChildrenHorizontal={24}
                >
                  <Text size="4xl" fontWeight="medium" color="catalinaBlue100">
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

                <StyledTextarea
                  marginBottom="s"
                  minRows={3}
                  maxRows={8}
                  placeholder="Join the Discussion ..."
                ></StyledTextarea>
                <StyledSubmitButton loading={false} type="submit">
                  Submit
                </StyledSubmitButton>
              </GuildBox>
            </section>

            {/* Post Comments */}
          </Card>
        </GuildBox>
      </HeaderLayout>
    )
  );
};

const StyledTextarea = styled(Textarea)``;

const StyledSubmitButton = styled(Button)`
  color: white;
  background-color: ${theme.colors.froly50};
  border-radius: 4px;
  align-self: flex-end;
  height: 32px;

  &:hover {
    background-color: ${theme.colors.slateBlue};
  }
`;

const StyledCommentsButton = styled(Button)`
  padding: 6px 14px;
  border-radius: 15px;
  height: 29px;
  background: white;

  svg {
    margin-left: 12px;
  }

  &:hover {
    background-color: ${theme.colors.lavender} !important;
  }

  filter: drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.12));
`;

export default Post;
