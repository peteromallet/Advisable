import React from "react";
import { useQuery } from "@apollo/client";
import { Box, Text } from "@advisable/donut";
import { GUILD_TOP_TOPICS_QUERY } from "./queries";
import Loading from "./Loading";
import TopicsList from "./TopicsList";

const Topics = () => {
  const { data, loading, error } = useQuery(GUILD_TOP_TOPICS_QUERY);
  const topics = data?.guildTopTopics.nodes;

  return (
    <Box flexShrink={1} alignSelf="flex-start">
      <Text
        fontSize="xs"
        marginBottom="4"
        color="neutral600"
        fontWeight="medium"
        textTransform="uppercase"
      >
        Topics
      </Text>

      {loading ? <Loading /> : null}
      {!loading && data ? <TopicsList topics={topics} /> : null}
      {error ? <Text>Failed to load topics</Text> : null}
    </Box>
  );
};

export default React.memo(Topics);
