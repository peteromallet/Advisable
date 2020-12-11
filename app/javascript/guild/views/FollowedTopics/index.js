import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Text, Box, Stack } from "@advisable/donut";
import { X } from "@styled-icons/heroicons-outline";
import Loading from "@advisable-main/components/Loading";
import { GUILD_TOPICS_FOLLOWS } from "./queries";
import { UNFOLLOW_GUILD_TOPIC } from "./mutations";
import ErrorBoundary from "@guild/components/ErrorBoundary";
import NoResults from "@guild/components/NoResults";
import { StyledGuildTopic } from "./styles";
import { GuildBox } from "@guild/styles";

const FollowedTopics = () => {
  const { data, loading } = useQuery(GUILD_TOPICS_FOLLOWS);
  const follows = data?.viewer?.guildTopicsFollows;

  const [unfollow] = useMutation(UNFOLLOW_GUILD_TOPIC, {
    refetchQueries: [{ query: GUILD_TOPICS_FOLLOWS }],
  });

  const unfollowGuildTopic = async (guildTopicId) => {
    await unfollow({
      variables: {
        input: {
          guildTopicId,
        },
      },
    });
  };

  if (loading) return <Loading />;

  return (
    <ErrorBoundary>
      <Box
        margin="0 auto"
        mt="2xl"
        width={{ _: "100%", s: "85%", l: "70%" }}
        p={{ _: "s", s: "l" }}
      >
        <Stack spacing="2xl">
          <Text
            fontSize="3xl"
            fontWeight="medium"
            color="catalinaBlue100"
            letterSpacing="-0.02em"
          >
            Topics You Follow
          </Text>
          {follows?.length ? (
            <GuildBox
              width="100%"
              display="flex"
              flexWrap="wrap"
              wrapChildrenBoth={8}
            >
              {follows.map((follow, key) => (
                <StyledGuildTopic
                  type="button"
                  onClick={() => unfollowGuildTopic(follow.id)}
                  key={key}
                >
                  <Text mr={2} size="s" color="#2B2D5F">
                    {follow.name}
                  </Text>
                  <X size={16} color="#2B2D5F" strokeWidth={2} />
                </StyledGuildTopic>
              ))}
            </GuildBox>
          ) : (
            <NoResults message={"You are not following any topics"} />
          )}
          <Text
            fontSize="xl"
            fontWeight="medium"
            color="catalinaBlue100"
            letterSpacing="-0.02em"
          >
            Popular Guild Topics
          </Text>
        </Stack>
      </Box>
    </ErrorBoundary>
  );
};

export default FollowedTopics;
