import React from "react";
import * as Sentry from "@sentry/react";
import { StyledPostCard } from "./styles";
import useViewerAuthor from "@guild/hooks/useViewerAuthor";
import Body from "./components/Body";
import PostTop from "./components/Top/PostTop";
import ArticleTop from "./components/Top/ArticleTop";

const Post = ({
  post,
  showEdit = false,
  showShare = false,
  showDelete = false,
  showResolve = false,
  walkthrough = false,
}) => {
  const { popularOrAuthorReactions } = useViewerAuthor(post);
  const hasArticle = post.type === "Case Study" && !!post.article;
  const TopContent = hasArticle ? ArticleTop : PostTop;

  return (
    <Sentry.ErrorBoundary>
      <StyledPostCard
        padding={[4, 6]}
        data-testid="post"
        pinned={post.pinned}
        popular={popularOrAuthorReactions}
      >
        <TopContent post={post} />
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
