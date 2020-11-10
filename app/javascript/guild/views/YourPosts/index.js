import React from "react";
import { useQuery } from "@apollo/client";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import Loading from "@advisable-main/components/Loading";
import { Text } from "@advisable/donut";
import { GuildBox } from "@guild/styles";
import Post from "@guild/components/Post";
import { GUILD_YOUR_POSTS_QUERY } from "./queries";
import Filters from "@guild/components/Filters";
import { cursorLoadMore } from "@guild/utils";

const YourPosts = () => {
  const { data, loading, fetchMore } = useQuery(GUILD_YOUR_POSTS_QUERY, {
    fetchPolicy: "network-only",
  });

  useBottomScrollListener(() => {
    cursorLoadMore({
      data,
      fetchMore,
      collectionKey: "guildYourPosts",
    });
  });

  return loading ? (
    <Loading />
  ) : (
    <GuildBox
      margin="0 auto"
      mt="2xl"
      width={{ _: "100%", s: "85%", l: "70%" }}
      p={{ _: "s", s: "l" }}
      flexCenterBoth
    >
      <GuildBox spaceChildrenVertical={24}>
        <Filters yourPosts />
        {data &&
          data.guildYourPosts.nodes.map((post, key) => (
            <YourPost key={key} post={post} />
          ))}
        {!loading && !data?.guildYourPosts?.nodes?.length && (
          <GuildBox
            background="white"
            spaceChildrenVertical={16}
            flexCenterBoth
            p="xl"
          >
            <Text
              fontSize="xxl"
              fontWeight="medium"
              letterSpacing="-0.01em"
              color="catalinaBlue100"
            >
              You have not created any posts. Add a post here
            </Text>
          </GuildBox>
        )}
      </GuildBox>
    </GuildBox>
  );
};

const YourPost = ({ post }) => {
  return <Post post={post} />;
};

export default YourPosts;
