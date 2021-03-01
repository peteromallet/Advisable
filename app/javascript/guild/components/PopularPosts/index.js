import React from "react";
import { StyledPopularPosts } from "./styles";
import LoadingPosts from "@guild/components/Posts/Loading";
import PopularPost from "./components/PopularPost";

const PopularPosts = ({ posts }) => {
  return (
    <StyledPopularPosts>
      {posts?.length ? (
        posts?.map((post) => <PopularPost key={post.id} post={post} />)
      ) : (
        <LoadingPosts skeletonPosts={1} />
      )}
    </StyledPopularPosts>
  );
};

export default PopularPosts;
