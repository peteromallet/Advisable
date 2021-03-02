import React from "react";
import { StyledPopularPosts } from "./styles";
import LoadingPosts from "@guild/components/Posts/Loading";
import PopularPost from "./components/PopularPost";

const PopularPosts = ({ posts, loading }) => {
  return (
    <StyledPopularPosts>
      {loading ? <LoadingPosts skeletonPosts={1} /> : null}
      {posts?.map((post) => (
        <PopularPost key={post.id} post={post} />
      ))}
    </StyledPopularPosts>
  );
};

export default PopularPosts;
