import React, { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Card, Text, Box, Combobox, Heading } from "@advisable/donut";
import { Plus } from "@styled-icons/heroicons-outline/Plus";
import Loading from "src/components/Loading";
import { GUILD_TOP_TOPICS_QUERY, SEARCH_LABELS } from "./queries";
import { useApolloClient } from "@apollo/client";
import ErrorBoundary from "@guild/components/ErrorBoundary";
import { StyledGuildTopic } from "./styles";
import { GuildBox } from "@guild/styles";
import useFollows from "./useFollows";

const Follows = () => {
  const client = useApolloClient();
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

  const handleSearch = async (name) => {
    const response = await client.query({
      query: SEARCH_LABELS,
      variables: { name },
    });

    return (response.data?.searchLabels || []).map((label) => label);
  };

  const handleChange = (topics) => {
    if (topics.length > followedTopics.length) {
      const addTopic = topics.filter((l) => !followedTopics.includes(l))[0];
      followTopic(addTopic.slug);
    } else if (topics.length < followedTopics.length) {
      const removeTopic = followedTopics.filter((t) => !topics.includes(t))[0];
      unfollowTopic(removeTopic.slug);
    }
  };

  return (
    <ErrorBoundary>
      <Box
        margin="0 auto"
        mt="2xl"
        maxWidth="840px"
        width="100%"
        p={{ _: "s", s: "l" }}
      >
        <Heading size="3xl" fontWeight={500} marginBottom={4}>
          Your Topics
        </Heading>
        <Card padding="l" mb={12}>
          <Combobox
            multiple
            loadOptions={handleSearch}
            placeholder="Skills, industries, locations..."
            onChange={(topics) => handleChange(topics)}
            value={followedTopics}
          />
          {followedTopics.length === 0 && (
            <Text
              textAlign="center"
              lineHeight="40px"
              paddingTop={4}
              color="neutral900"
              fontSize="lg"
            >
              You are not following any topics
            </Text>
          )}
        </Card>

        <Heading size="3xl" fontWeight={500} marginBottom={4}>
          Popular Topics
        </Heading>
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
      </Box>
    </ErrorBoundary>
  );
};

export default Follows;
