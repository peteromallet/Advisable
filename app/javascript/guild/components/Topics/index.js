import React from "react";
import { useQuery } from "@apollo/client";
import { Box, Text, Stack } from "@advisable/donut";
import { GUILD_TOP_TOPICS_QUERY } from "./queries";
import { useToggle } from "@guild/hooks/useToggle";
import Loading from "@advisable-main/components/Loading";
import ShowMore from "@guild/components/ShowMore";
import Topic from "./components/Topic";

const Topics = () => {
  const { data, loading } = useQuery(GUILD_TOP_TOPICS_QUERY);
  const [moreTopics, toggleMoreTopics] = useToggle();

  if (loading) return <Loading />;

  return (
    <Box flexShrink={1} alignSelf="flex-start">
      <Text
        fontSize="xl"
        marginBottom="md"
        fontWeight="medium"
        color="catalinaBlue100"
        letterSpacing="-0.02em"
      >
        Topics
      </Text>

      <Stack spacing="1" marginBottom="lg">
        {data?.guildTopTopics?.nodes?.map(
          (topic, key) =>
            (moreTopics || key < data?.guildTopTopics?.nodes?.length / 2.5) && (
              <Topic key={key} topic={topic} />
            ),
        )}
      </Stack>

      <ShowMore showingMore={moreTopics} onToggle={toggleMoreTopics} />
    </Box>
  );
};

export default React.memo(Topics);
