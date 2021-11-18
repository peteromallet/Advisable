import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Card, Text, Box, Stack } from "@advisable/donut";
import { Plus } from "@styled-icons/heroicons-outline/Plus";
import { X } from "@styled-icons/heroicons-outline/X";
import Loading from "@advisable-main/components/Loading";
import { GUILD_TOP_TOPICS_QUERY } from "./queries";
import ErrorBoundary from "@guild/components/ErrorBoundary";
import NoResults from "@guild/components/NoResults";
import { StyledGuildTopic } from "./styles";
import { GuildBox } from "@guild/styles";
import useFollows from "./useFollows";

const Follows = () => {
  const { unfollowTopic, followTopic, followedTopics, followedTopicsLoading } =
    useFollows();

  const { data: topTopicsData, loading: topTopicsLoading } = useQuery(
    GUILD_TOP_TOPICS_QUERY,
  );
  const topTopics = topTopicsData?.topLabels?.nodes;

  /*
    Top Topics that aren't followed
  */
  const unfollowedTopTopics = useMemo(() => {
    return followedTopics?.length
      ? topTopics?.filter((tt) => !followedTopics.find((gt) => gt.id === tt.id))
      : topTopics;
  }, [followedTopics, topTopics]);

  if (followedTopicsLoading || topTopicsLoading) return <Loading />;

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
            Your Guild Topics
          </Text>
          {followedTopics?.length ? (
            <Card padding="l">
              <GuildBox
                width="100%"
                display="flex"
                flexWrap="wrap"
                wrapChildrenBoth={8}
              >
                {followedTopics.map((topic, key) => (
                  <StyledGuildTopic
                    type="button"
                    onClick={() => unfollowTopic(topic.slug)}
                    key={key}
                  >
                    <Text mr={2} size="s" color="#2B2D5F">
                      {topic.name}
                    </Text>
                    <X size={16} color="#2B2D5F" strokeWidth={2} />
                  </StyledGuildTopic>
                ))}
              </GuildBox>
            </Card>
          ) : (
            <NoResults message={"You are not following any topics"} />
          )}

          <Text
            fontSize="3xl"
            fontWeight="medium"
            color="catalinaBlue100"
            letterSpacing="-0.02em"
          >
            Popular Topics
          </Text>
          <Card padding="l">
            <GuildBox
              width="100%"
              display="flex"
              flexWrap="wrap"
              wrapChildrenBoth={8}
            >
              {unfollowedTopTopics.map((topic, key) => (
                <StyledGuildTopic
                  type="button"
                  onClick={() => followTopic(topic.slug)}
                  key={key}
                >
                  <Text mr={2} size="s" color="#2B2D5F">
                    {topic.name}
                  </Text>
                  <Plus size={16} color="#2B2D5F" strokeWidth={2} />
                </StyledGuildTopic>
              ))}
            </GuildBox>
          </Card>
        </Stack>
      </Box>
    </ErrorBoundary>
  );
};

export default Follows;
