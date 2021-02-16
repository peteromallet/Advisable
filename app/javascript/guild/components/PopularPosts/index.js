import React from "react";
import { useQuery } from "@apollo/client";
import { GUILD_POPULAR_POSTS_QUERY } from "./queries";
import { StyledPopularPosts } from "./styles";
import LoadingPosts from "@guild/components/Posts/Loading";
import PopularPost from "./components/PopularPost";

const PopularPosts = () => {
  const { data, loading } = useQuery(GUILD_POPULAR_POSTS_QUERY);

  return (
    <StyledPopularPosts>
      {loading ? <LoadingPosts skeletonPosts={1} /> : null}
      {data?.guildPopularPosts?.map((post) => (
        <PopularPost key={post.id} post={post} />
      ))}
    </StyledPopularPosts>
  );
};

export default PopularPosts;
