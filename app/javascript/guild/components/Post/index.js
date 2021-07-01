import React from "react";
import * as Sentry from "@sentry/react";
import { StyledPostCard } from "./styles";
import { Box } from "@advisable/donut";
import useViewerAuthor from "@guild/hooks/useViewerAuthor";
import Body from "./components/Body";
import PostCover from "./components/Cover/PostCover";
import ArticleCover from "./components/Cover/ArticleCover";
import AuthorDetails from "./components/AuthorDetails";
import PostTypeTag from "@guild/components/PostTypeTag";

const Post = ({
  post,
  showEdit = false,
  showShare = false,
  showDelete = false,
  showResolve = false,
  walkthrough = false,
}) => {
  const { popularOrAuthorReactions } = useViewerAuthor(post);
  const Cover = post.article ? ArticleCover : PostCover;

  return (
    <Sentry.ErrorBoundary>
      <StyledPostCard
        padding={[4, 6]}
        data-testid="post"
        pinned={post.pinned}
        popular={popularOrAuthorReactions}
      >
        <Cover post={post} />
        <Box position="absolute" right="2" top="2">
          <PostTypeTag post={post} />
        </Box>
        <AuthorDetails post={post} />
        <Body
          post={post}
          showEdit={showEdit}
          showShare={showShare}
          showDelete={showDelete}
          showResolve={showResolve}
          walkthrough={walkthrough}
          popularOrAuthorReactions={popularOrAuthorReactions}
        />
      </StyledPostCard>
    </Sentry.ErrorBoundary>
  );
};

export default Post;
