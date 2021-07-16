import React from "react";
import { StyledPopularPosts } from "./styles";
import LoadingPosts from "@guild/components/Posts/Loading";
import PopularPost from "./components/PopularPost";

function PopularPosts({ posts, loading }) {
  return (
    <StyledPopularPosts>
      {loading ? <LoadingPosts skeletonPosts={1} /> : null}
      {posts?.map((post) => (
        <PopularPost key={post.id} post={post} />
      ))}
    </StyledPopularPosts>
  );
}

function areEqual({ posts: prev }, { posts: next }) {
  return prev === next;
}

export default React.memo(PopularPosts, areEqual);
